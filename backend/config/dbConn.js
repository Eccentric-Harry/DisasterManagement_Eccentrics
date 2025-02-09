const mongoose = require('mongoose');
const { DB_NAME } = require('../constants'); 

const connectDB = async () => {
  try {
    const uri = `${process.env.DATABASE_URI}/${DB_NAME}`;
    
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
