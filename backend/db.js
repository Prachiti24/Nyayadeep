const mongoose = require('mongoose');
require('dotenv').config();

console.log(process.env.MONGODB_URI);
const connectDB = async () => {
  try {
   // await mongoose.connect(process.env.MONGODB_URI);
   await mongoose.connect(process.env.MONGO_URL);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
