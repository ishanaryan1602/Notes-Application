const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to ${connect.connection.host}`);
  } catch (err) {
    console.error(`erros is ${err.message}`);
    process.exit(1);
  }
};

module.exports = { connectDB };
