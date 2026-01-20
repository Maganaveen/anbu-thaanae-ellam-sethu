const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const Razorpay = require('razorpay');
const cron = require('node-cron');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Image, AdminVideo } = require('./models');
const Page = require('./models/Page');
const { authenticate, requireAdmin, authRoutes } = require('./auth');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Create uploads directory
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
  fs.mkdirSync('uploads/images');
  fs.mkdirSync('uploads/videos');
  fs.mkdirSync('uploads/thumbnails');
}

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = file.fieldname === 'video' ? 'uploads/videos' : 'uploads/images';
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: {
    fileSize: 500 * 1024 * 1024, // 500MB for videos
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'image') {
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Only image files allowed'));
      }
    } else if (file.fieldname === 'video') {
      if (file.mimetype.startsWith('video/')) {
        cb(null, true);
      } else {
        cb(new Error('Only video files allowed'));
      }
    } else {
      cb(null, true);
    }
  }
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/anbu-thaane', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  // console.log('✅ MongoDB connected successfully!');
  // console.log('📊 Database:', mongoose.connection.name);
})
.catch((error) => {
  // console.error('❌ MongoDB connection failed:', error.message);
  process.exit(1);
});

// MongoDB connection events
mongoose.connection.on('connected', () => {
  // console.log('🔗 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  // console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  // console.log('🔌 Mongoose disconnected from MongoDB');
});

// Video Schema
const videoSchema = new mongoose.Schema({
  videoId: { type: String, unique: true, required: true },
  title: { type: String, required: true },
  description: String,
  publishedAt: Date,
  thumbnails: Object,
  viewCount: String,
  likeCount: String,
  duration: String,
  featured: { type: Boolean, default: false },
  isShort: { type: Boolean, default: false },
  isLive: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Video = mongoose.model('Video', videoSchema);

// Donation Schema
const donationSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  donorName: String,
  email: String,
  paymentId: String,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

const Donation = mongoose.model('Donation', donationSchema);

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// YouTube API functions
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

async function fetchChannelVideos() {
  try {
    if (!YOUTUBE_API_KEY || YOUTUBE_API_KEY === 'your_youtube_api_key_here' || !CHANNEL_ID || CHANNEL_ID === 'your_channel_id_here') {
      // // console.log('YouTube API not configured, skipping video fetch');
      return;
    }

    // // console.log('Fetching videos from channel:', CHANNEL_ID);
    
    // First get the uploads playlist ID
    const channelResponse = await axios.get(`https://www.googleapis.com/youtube/v3/channels`, {
      params: {
        key: YOUTUBE_API_KEY,
        id: CHANNEL_ID,
        part: 'contentDetails'
      }
    });
    
    const uploadsPlaylistId = channelResponse.data.items[0]?.contentDetails?.relatedPlaylists?.uploads;
    if (!uploadsPlaylistId) {
      // // console.log('Could not find uploads playlist');
      return;
    }
    
    // // console.log('Uploads playlist ID:', uploadsPlaylistId);
    
    let allVideos = [];
    let nextPageToken = '';
    let totalFetched = 0;
    
    // Fetch all videos from uploads playlist
    do {
      // // console.log(`Fetching page with token: ${nextPageToken || 'first page'}`);
      
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems`, {
        params: {
          key: YOUTUBE_API_KEY,
          playlistId: uploadsPlaylistId,
          part: 'snippet',
          maxResults: 50,
          ...(nextPageToken && { pageToken: nextPageToken })
        }
      });

      // console.log(`API Response: ${response.data.items.length} videos, nextPageToken: ${response.data.nextPageToken || 'none'}`);
      
      const videoIds = response.data.items.map(item => item.snippet.resourceId.videoId).join(',');
      
      if (videoIds) {
        const statsResponse = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
          params: {
            key: YOUTUBE_API_KEY,
            id: videoIds,
            part: 'statistics,contentDetails'
          }
        });

        const videos = response.data.items.map(item => {
          const stats = statsResponse.data.items.find(stat => stat.id === item.snippet.resourceId.videoId);
          const duration = stats?.contentDetails?.duration || 'PT0S';
          
          // Parse duration properly - PT1M30S = 1 minute 30 seconds
          let totalSeconds = 0;
          if (duration.includes('H')) {
            const hours = parseInt(duration.match(/(\d+)H/)?.[1] || '0');
            totalSeconds += hours * 3600;
          }
          if (duration.includes('M')) {
            const minutes = parseInt(duration.match(/(\d+)M/)?.[1] || '0');
            totalSeconds += minutes * 60;
          }
          if (duration.includes('S')) {
            const seconds = parseInt(duration.match(/(\d+)S/)?.[1] || '0');
            totalSeconds += seconds;
          }
          
          const isShort = totalSeconds > 0 && totalSeconds <= 60;
          const isLive = item.snippet.liveBroadcastContent === 'live' || 
                        item.snippet.liveBroadcastContent === 'upcoming' ||
                        item.snippet.liveBroadcastContent === 'completed';
          
          return {
            videoId: item.snippet.resourceId.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            publishedAt: new Date(item.snippet.publishedAt),
            thumbnails: item.snippet.thumbnails,
            viewCount: stats?.statistics?.viewCount || '0',
            likeCount: stats?.statistics?.likeCount || '0',
            duration: duration,
            isShort: isShort,
            isLive: isLive
          };
        });

        allVideos = allVideos.concat(videos);
        totalFetched += videos.length;
      }
      
      nextPageToken = response.data.nextPageToken;
      // console.log(`Fetched ${totalFetched} videos so far...`);
      
      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } while (nextPageToken && totalFetched < 2000); // Limit to 2000 videos max

    // Save all videos to database
    for (const video of allVideos) {
      await Video.findOneAndUpdate(
        { videoId: video.videoId },
        video,
        { upsert: true, new: true }
      );
    }

    // console.log(`Updated ${allVideos.length} total videos`);
  } catch (error) {
    // console.error('Error fetching videos:', error.response?.data || error.message);
    if (error.response?.status === 403) {
      // console.log('API Key issue - Check if:');
      // console.log('1. YouTube Data API v3 is enabled in Google Cloud // console');
      // console.log('2. Billing is enabled (required for API usage)');
      // console.log('3. API key has correct restrictions');
    }
  }
}

// Initialize auth routes
authRoutes(app);

// Image upload route
app.post('/api/images/upload', authenticate, upload.single('image'), async (req, res) => {
  try {
    const { templeName, city, district, state, latitude, longitude, description, language, deity, category } = req.body;
    
    const image = new Image({
      userId: req.user._id,
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
      mimeType: req.file.mimetype,
      templeName,
      city,
      district,
      state,
      gpsLocation: { latitude: parseFloat(latitude), longitude: parseFloat(longitude) },
      description,
      language,
      deity,
      category
    });

    await image.save();
    res.status(201).json({ message: 'Image uploaded successfully', imageId: image._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get user's uploaded images
app.get('/api/images/my-uploads', authenticate, async (req, res) => {
  try {
    const images = await Image.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .populate('approvedBy', 'name');
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get approved images (public gallery)
app.get('/api/images/gallery', async (req, res) => {
  try {
    const { page = 1, limit = 12, search, city, district, deity, category } = req.query;
    let query = { status: 'approved' };
    
    if (search) {
      query.$or = [
        { templeName: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { deity: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (city) query.city = { $regex: city, $options: 'i' };
    if (district) query.district = { $regex: district, $options: 'i' };
    if (deity) query.deity = { $regex: deity, $options: 'i' };
    if (category) query.category = category;

    const images = await Image.find(query)
      .sort({ approvedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('userId', 'name')
      .select('-path'); // Don't expose file paths

    const total = await Image.countDocuments(query);
    
    res.json({
      images,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Get pending images for approval
app.get('/api/admin/images/pending', authenticate, requireAdmin, async (req, res) => {
  try {
    const images = await Image.find({ status: 'pending' })
      .sort({ createdAt: -1 })
      .populate('userId', 'name email');
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Approve/Reject image
app.patch('/api/admin/images/:id/moderate', authenticate, requireAdmin, async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    
    const image = await Image.findByIdAndUpdate(
      req.params.id,
      {
        status,
        adminNotes,
        approvedBy: status === 'approved' ? req.user._id : undefined,
        approvedAt: status === 'approved' ? new Date() : undefined
      },
      { new: true }
    );
    
    res.json(image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Upload video
app.post('/api/admin/videos/upload', authenticate, requireAdmin, upload.single('video'), async (req, res) => {
  try {
    const { title, description, language, category } = req.body;
    
    const video = new AdminVideo({
      title,
      description,
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
      language,
      category,
      uploadedBy: req.user._id
    });

    await video.save();
    res.status(201).json({ message: 'Video uploaded successfully', videoId: video._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get admin videos
app.get('/api/admin/videos', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const videos = await AdminVideo.find({ isActive: true })
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('uploadedBy', 'name')
      .select('-path'); // Don't expose file paths

    const total = await AdminVideo.countDocuments({ isActive: true });
    
    res.json({
      videos,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Stream admin video
app.get('/api/admin/videos/:id/stream', async (req, res) => {
  try {
    const video = await AdminVideo.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }

    const videoPath = video.path;
    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = (end - start) + 1;
      const file = fs.createReadStream(videoPath, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(200, head);
      fs.createReadStream(videoPath).pipe(res);
    }

    // Increment view count
    await AdminVideo.findByIdAndUpdate(req.params.id, { $inc: { viewCount: 1 } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin dashboard stats
app.get('/api/admin/stats', authenticate, requireAdmin, async (req, res) => {
  try {
    const [totalUsers, pendingImages, approvedImages, totalVideos, totalDonations, totalDonationAmount] = await Promise.all([
      User.countDocuments({ role: 'user' }),
      Image.countDocuments({ status: 'pending' }),
      Image.countDocuments({ status: 'approved' }),
      AdminVideo.countDocuments({ isActive: true }),
      Donation.countDocuments(),
      Donation.aggregate([{ $group: { _id: null, total: { $sum: '$amount' } } }])
    ]);

    res.json({
      totalUsers,
      pendingImages,
      approvedImages,
      totalVideos,
      totalDonations,
      totalDonationAmount: totalDonationAmount[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Get all images (approved gallery)
app.get('/api/admin/gallery', authenticate, requireAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 12 } = req.query;
    
    const images = await Image.find({ status: 'approved' })
      .sort({ approvedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('userId', 'name email')
      .populate('approvedBy', 'name');

    const total = await Image.countDocuments({ status: 'approved' });
    
    res.json({
      images,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Get all donations
app.get('/api/admin/donations', authenticate, requireAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    
    const donations = await Donation.find()
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Donation.countDocuments();
    const totalAmount = await Donation.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    
    res.json({
      donations,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalAmount: totalAmount[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Seed sample videos route
app.post('/api/seed-videos', async (req, res) => {
  try {
    const sampleVideos = [
      {
        videoId: 'sample1',
        title: 'Tamil Devotional Song - Anbu Thaane',
        description: 'Beautiful devotional song about love and spirituality in Tamil culture',
        publishedAt: new Date('2024-01-15'),
        thumbnails: {
          default: { url: '/images/anbu_thane_ellam_sethu.JPEG' },
          medium: { url: '/images/anbu_thane_ellam_sethu.JPEG' },
          high: { url: '/images/anbu_thane_ellam_sethu.JPEG' }
        },
        viewCount: '1500',
        likeCount: '120',
        duration: 'PT5M30S',
        featured: true
      },
      {
        videoId: 'sample2',
        title: 'Tamil Cultural Values and Traditions',
        description: 'Discussion about Tamil culture, traditions and spiritual values',
        publishedAt: new Date('2024-01-10'),
        thumbnails: {
          default: { url: '/images/anbu_thane_ellam_sethu.JPEG' },
          medium: { url: '/images/anbu_thane_ellam_sethu.JPEG' },
          high: { url: '/images/anbu_thane_ellam_sethu.JPEG' }
        },
        viewCount: '2300',
        likeCount: '180',
        duration: 'PT8M15S'
      },
      {
        videoId: 'sample3',
        title: 'Spiritual Guidance for Daily Life',
        description: 'Spiritual teachings and guidance for peaceful daily living',
        publishedAt: new Date('2024-01-05'),
        thumbnails: {
          default: { url: '/images/anbu_thane_ellam_sethu.JPEG' },
          medium: { url: '/images/anbu_thane_ellam_sethu.JPEG' },
          high: { url: '/images/anbu_thane_ellam_sethu.JPEG' }
        },
        viewCount: '1800',
        likeCount: '150',
        duration: 'PT6M45S',
        featured: true
      },
      {
        videoId: 'sample4',
        title: 'Tamil Spiritual Stories',
        description: 'Traditional Tamil spiritual stories and their meanings',
        publishedAt: new Date('2024-01-01'),
        thumbnails: {
          default: { url: '/images/anbu_thane_ellam_sethu.JPEG' },
          medium: { url: '/images/anbu_thane_ellam_sethu.JPEG' },
          high: { url: '/images/anbu_thane_ellam_sethu.JPEG' }
        },
        viewCount: '3200',
        likeCount: '250',
        duration: 'PT10M20S'
      },
      {
        videoId: 'sample5',
        title: 'Meditation and Inner Peace',
        description: 'Guide to meditation and finding inner peace through Tamil wisdom',
        publishedAt: new Date('2023-12-28'),
        thumbnails: {
          default: { url: '/images/anbu_thane_ellam_sethu.JPEG' },
          medium: { url: '/images/anbu_thane_ellam_sethu.JPEG' },
          high: { url: '/images/anbu_thane_ellam_sethu.JPEG' }
        },
        viewCount: '2800',
        likeCount: '220',
        duration: 'PT7M30S'
      },
      {
        videoId: 'sample6',
        title: 'Tamil Devotional Prayers',
        description: 'Collection of powerful Tamil devotional prayers and chants',
        publishedAt: new Date('2023-12-25'),
        thumbnails: {
          default: { url: '/images/anbu_thane_ellam_sethu.JPEG' },
          medium: { url: '/images/anbu_thane_ellam_sethu.JPEG' },
          high: { url: '/images/anbu_thane_ellam_sethu.JPEG' }
        },
        viewCount: '4100',
        likeCount: '320',
        duration: 'PT12M10S',
        featured: true
      }
    ];

    for (const video of sampleVideos) {
      await Video.findOneAndUpdate(
        { videoId: video.videoId },
        video,
        { upsert: true, new: true }
      );
    }

    res.json({ message: `Seeded ${sampleVideos.length} sample videos` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Manual fetch all videos route
app.post('/api/fetch-all-videos', async (req, res) => {
  try {
    await fetchChannelVideos();
    const totalVideos = await Video.countDocuments();
    res.json({ message: `Fetched videos successfully. Total videos in database: ${totalVideos}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get video count by type
app.get('/api/video-stats', async (req, res) => {
  try {
    const [total, shorts, live, regular] = await Promise.all([
      Video.countDocuments(),
      Video.countDocuments({ isShort: true }),
      Video.countDocuments({ isLive: true }),
      Video.countDocuments({ isShort: false, isLive: false })
    ]);
    
    res.json({
      total,
      shorts,
      live,
      regular
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get posts (YouTube community posts)
app.get('/api/posts', async (req, res) => {
  try {
    if (!YOUTUBE_API_KEY || YOUTUBE_API_KEY === 'your_youtube_api_key_here' || !CHANNEL_ID || CHANNEL_ID === 'your_channel_id_here') {
      return res.json({ posts: [] });
    }

    let posts = [];
    
    try {
      // Try activities endpoint first
      const activitiesResponse = await axios.get(`https://www.googleapis.com/youtube/v3/activities`, {
        params: {
          key: YOUTUBE_API_KEY,
          channelId: CHANNEL_ID,
          part: 'snippet,contentDetails',
          maxResults: 20
        }
      });

      const activityPosts = activitiesResponse.data.items
        .filter(item => item.snippet.type === 'bulletin')
        .map(item => ({
          id: item.id,
          content: item.snippet.description || item.snippet.title,
          publishedAt: item.snippet.publishedAt,
          author: item.snippet.channelTitle,
          timeAgo: getTimeAgo(item.snippet.publishedAt)
        }));
      
      posts = posts.concat(activityPosts);
    } catch (actError) {
      console.log('Activities API failed:', actError.message);
    }

    // If no posts from activities, create sample posts as fallback
    if (posts.length === 0) {
      posts = [
        {
          id: 'sample_post_1',
          content: 'Welcome to our Tamil devotional channel! 🙏 Share your spiritual experiences with us.',
          publishedAt: new Date().toISOString(),
          author: 'Anbu Thaane Ellam Sethu',
          timeAgo: 'Today'
        },
        {
          id: 'sample_post_2', 
          content: 'New devotional video coming soon! Stay tuned for beautiful Tamil spiritual content.',
          publishedAt: new Date(Date.now() - 86400000).toISOString(),
          author: 'Anbu Thaane Ellam Sethu',
          timeAgo: '1 day ago'
        }
      ];
    }
    
    res.json({ posts });
  } catch (error) {
    console.error('Error fetching posts:', error.message);
    res.json({ posts: [] });
  }
});

// Helper function to calculate time ago
function getTimeAgo(dateString) {
  const now = new Date();
  const postDate = new Date(dateString);
  const diffInMs = now - postDate;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);
  
  if (diffInDays < 1) return 'Today';
  if (diffInDays === 1) return '1 day ago';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInWeeks === 1) return '1 week ago';
  if (diffInWeeks < 4) return `${diffInWeeks} weeks ago`;
  if (diffInMonths === 1) return '1 month ago';
  return `${diffInMonths} months ago`;
}

app.get('/api/videos', async (req, res) => {
  try {
    const { page = 1, limit = 24, type = 'latest' } = req.query;
    let query = {};
    let sort = { publishedAt: -1 };

    if (type === 'featured') {
      query.featured = true;
    } else if (type === 'popular') {
      sort = { viewCount: -1 };
    } else if (type === 'shorts') {
      query.isShort = true;
    } else if (type === 'live') {
      query.isLive = true;
    }

    const videos = await Video.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Video.countDocuments(query);

    res.json({
      videos,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/videos/:id', async (req, res) => {
  try {
    const video = await Video.findOne({ videoId: req.params.id });
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }
    res.json(video);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Donation routes
app.post('/api/donation/create', async (req, res) => {
  try {
    const { amount, donorName, email } = req.body;

    const options = {
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    const donation = new Donation({
      amount,
      donorName,
      email,
      paymentId: order.id
    });

    await donation.save();

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/donation/verify', async (req, res) => {
  try {
    const { paymentId, orderId, signature } = req.body;

    // Verify payment signature here (implement Razorpay signature verification)
    
    await Donation.findOneAndUpdate(
      { paymentId: orderId },
      { status: 'completed' }
    );

    res.json({ success: true, message: 'Donation successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin page management routes
app.get('/api/admin/pages', authenticate, requireAdmin, async (req, res) => {
  try {
    const pages = await Page.find().populate('modifiedBy', 'name');
    res.json(pages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/admin/pages/:type', authenticate, requireAdmin, async (req, res) => {
  try {
    const page = await Page.findOne({ type: req.params.type }).populate('modifiedBy', 'name');
    res.json(page);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/admin/pages/:type', authenticate, requireAdmin, async (req, res) => {
  try {
    const { title, content, metadata } = req.body;
    const page = await Page.findOneAndUpdate(
      { type: req.params.type },
      {
        title,
        content,
        metadata,
        lastModified: new Date(),
        modifiedBy: req.user._id
      },
      { upsert: true, new: true }
    ).populate('modifiedBy', 'name');
    res.json(page);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Public page content routes
app.get('/api/pages/:type', async (req, res) => {
  try {
    const page = await Page.findOne({ type: req.params.type });
    res.json(page);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Contact form submission
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    // Here you can save to database or send email
    res.json({ success: true, message: 'Message received successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin routes
app.post('/api/admin/videos/:id/feature', async (req, res) => {
  try {
    const video = await Video.findOneAndUpdate(
      { videoId: req.params.id },
      { featured: req.body.featured },
      { new: true }
    );
    res.json(video);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create admin user if none exists
async function createDefaultAdmin() {
  try {
    const { User } = require('./models');
    const adminExists = await User.findOne({ role: 'admin' });
    
    if (!adminExists) {
      const defaultAdmin = new User({
        email: 'admin@anbuthaane.com',
        mobile: '9342732720',
        password: 'AnbuAdmin@2024',
        name: 'Admin User',
        role: 'admin'
      });
      
      await defaultAdmin.save();
      // console.log('✅ Default admin user created:');
      // console.log('   Email: admin@anbuthaane.com');
      // console.log('   Password: AnbuAdmin@2024');
    }
  } catch (error) {
    // console.error('❌ Error creating default admin:', error.message);
  }
}

// Sync videos every 6 hours (instead of every hour to avoid quota limits)
cron.schedule('0 */6 * * *', fetchChannelVideos);

// Initial sync
// fetchChannelVideos(); // Commented out to avoid immediate API calls

app.listen(PORT, () => {
  // console.log(`🚀 Server running on port ${PORT}`);
  // console.log(`🌐 API URL: http://localhost:${PORT}`);
  // Create default admin user after server starts
  setTimeout(createDefaultAdmin, 2000);
  // Initial video sync
  setTimeout(fetchChannelVideos, 3000);
});