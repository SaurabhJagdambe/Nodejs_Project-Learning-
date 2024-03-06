// const mongoose = require("mongoose");
//Define Mongpdb Connection URL
// // const mongoURL = "mongodb://localhost:27017/Demo1";
// const mongoURL = "mongodb://0.0.0.0:27017/Demo1";

// //set up MongoDB Connection
// mongoose.connect(mongoURL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// //Mongoose Maintain a default connection objecet
// const db = mongoose.connection;

// db.on("connceted", () => {
//   console.log("Mongo Connected");
// });

// db.on("error", (err) => {
//   console.log("Mongo Error", err);
// });

// db.on("disconnceted", () => {
//   console.log("Mongo disConnected");
// });

// //export data base
// module.exports = db;

var mongoose = require("mongoose");
mongoose.connect("mongodb://0.0.0.0:27017/Demo1", { useNewUrlParser: true });
var conn = mongoose.connection;
conn.on("connected", function () {
  console.log("database is connected successfully");
});
conn.on("disconnected", function () {
  console.log("database is disconnected successfully");
});
conn.on("error", console.error.bind(console, "connection error:"));
module.exports = conn;
