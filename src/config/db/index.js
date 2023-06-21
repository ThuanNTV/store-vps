const mongoose = require("mongoose");
require("dotenv").config();

async function connect() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("connect successfully!!!");
  } catch (error) {
    console.log("connect failure!!!");
  }
}

module.exports = { connect };
