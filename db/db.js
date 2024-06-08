const mongoose = require("mongoose");
require('dotenv').config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.mongo_uri);
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

module.exports = connectDB;