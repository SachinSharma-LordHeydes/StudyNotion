const mongoose = require("mongoose");

require("dotenv").config();

const DB_URL = process.env.DB_URL;

exports.dbConnect = async () => {
  try {
    const dbConnectionResponse = await mongoose.connect(DB_URL);
    if (dbConnectionResponse) {
      console.log("Successfully Connected to database");
    }
  } catch (error) {
    console.log("Error while connecting to database => ", error);
  }
};
