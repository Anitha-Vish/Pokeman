const mongoose= require("mongoose");
require('dotenv').config();
const ConnectToDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
    console.log(connection.connection.db.databaseName);
  } catch (error) {
    console.log('Connection error:', error.stack);
  }
};

module.exports = ConnectToDB;