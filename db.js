var mongoose = require("mongoose");
require("dotenv").config();

// const mongoURL =
//   "mongodb+srv://Saurav123:Saurav%40123@cluster1.fgbpbzn.mongodb.net/"; // this is atlaas mongo data
const mongoURL = process.env.LOCAL_URL; //local monoDb
// const mongoURL = process.env.MONGODB_URL;
mongoose.connect(mongoURL, { useNewUrlParser: true });

var conn = mongoose.connection;
conn.on("connected", function () {
  console.log("database is connected successfully");
});
conn.on("disconnected", function () {
  console.log("database is disconnected successfully");
});
conn.on("error", console.error.bind(console, "connection error:"));
module.exports = conn;

//mongo pass = Saurav@123 but @ = %23
