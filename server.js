const express = require("express");
const app = express();
const db = require("./db");

// body parser - to parse the data
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// Home api route
app.get("/", function (req, res) {
  res.send("Hello....  Welcome to My Hotel");
});

//middelwares
//Route for person
const personRoute = require("./routes/personsRoute");
app.use("/person", personRoute);

//Route for Menu
const menuRoute = require("./routes/menuRoutes");
app.use("/menu", menuRoute);

//port listning
app.listen(3001, () => {
  console.log("Listning to port 3001");
});
