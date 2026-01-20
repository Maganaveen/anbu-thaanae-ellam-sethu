const mongoose = require('mongoose');
const { User } = require('./models');
require('dotenv').config();

async function seedAdmin() {
  try {
    // console.log('🌱 Starting admin seeder...');
    // console.log('📡 Connecting to MongoDB Atlas...');
    // console.log('🔗 URI:', process.env.MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@'));
    
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    
    // console.log('✅ Connected to MongoDB Atlas successfully!');
    // console.log('📊 Database:', mongoose.connection.name);
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      // console.log('⚠️  Admin user already exists:', existingAdmin.email);
      await mongoose.connection.close();
      return;
    }
    
    // Create admin user
    const adminUser = new User({
      email: 'admin@gmail.com',
      mobile: '9342732720',
      password: '12345678',
      name: 'Anbu Thaane Admin',
      role: 'admin'
    });
    
    await adminUser.save();
    
    // console.log('🎉 Admin user created successfully!');
    // console.log('📧 Email: admin@gmail.com');
    // console.log('🔑 Password: 12345678');
    // console.log('📱 Mobile: 9342732720');
    // console.log('👑 Role: admin');
    
    await mongoose.connection.close();
    // console.log('✅ Database connection closed');
    
  } catch (error) {
    // console.error('❌ Seeder failed:', error.message);
    if (error.name === 'MongoServerSelectionError') {
      // console.log('💡 Possible solutions:');
      // console.log('   1. Check MongoDB Atlas credentials');
      // console.log('   2. Verify IP whitelist (0.0.0.0/0 for all IPs)');
      // console.log('   3. Ensure cluster is running');
    }
    process.exit(1);
  }
}

seedAdmin();