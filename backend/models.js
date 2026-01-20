const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

// Image Upload Schema
const imageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  path: { type: String, required: true },
  size: { type: Number, required: true },
  mimeType: { type: String, required: true },
  
  // Temple/Location Details
  templeName: { type: String, required: true },
  city: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
  gpsLocation: {
    latitude: { type: Number },
    longitude: { type: Number }
  },
  
  // Content Details
  description: { type: String, required: true },
  language: { type: String, enum: ['ta', 'en'], default: 'ta' },
  deity: { type: String },
  category: { type: String, enum: ['temple', 'statue', 'spiritual_place'], default: 'temple' },
  
  // Moderation
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  adminNotes: { type: String },
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  approvedAt: { type: Date },
  
  createdAt: { type: Date, default: Date.now }
});

// Admin Video Schema
const adminVideoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  filename: { type: String, required: true },
  path: { type: String, required: true },
  duration: { type: Number }, // in seconds
  size: { type: Number },
  thumbnail: { type: String },
  language: { type: String, enum: ['ta', 'en'], default: 'ta' },
  category: { type: String, default: 'spiritual' },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isActive: { type: Boolean, default: true },
  viewCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = {
  User: mongoose.model('User', userSchema),
  Image: mongoose.model('Image', imageSchema),
  AdminVideo: mongoose.model('AdminVideo', adminVideoSchema)
};