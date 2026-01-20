const mongoose = require('mongoose');
require('dotenv').config();

async function testMongoConnection() {
  try {
    // console.log('Testing MongoDB connection...');
    // console.log('MongoDB URI:', process.env.MONGODB_URI);
    
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    // console.log('✅ MongoDB connected successfully!');
    
    // Test database operations
    const testCollection = mongoose.connection.db.collection('test');
    await testCollection.insertOne({ test: 'connection', timestamp: new Date() });
    // console.log('✅ Database write test successful!');
    
    const testDoc = await testCollection.findOne({ test: 'connection' });
    // console.log('✅ Database read test successful!', testDoc);
    
    // Clean up test document
    await testCollection.deleteOne({ test: 'connection' });
    // console.log('✅ Database cleanup successful!');
    
    await mongoose.connection.close();
    // console.log('✅ MongoDB connection closed successfully!');
    
  } catch (error) {
    // console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

testMongoConnection();