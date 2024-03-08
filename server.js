const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();
const passport = require("./auth");
const PORT = process.env.PORT || 3001;

// body parser - to parse the data
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(passport.initialize());
const LocalAuth = passport.authenticate("local", { session: false });

// Home api route
app.get("/", LocalAuth, function (req, res) {
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
app.listen(PORT, () => {
  console.log("Listning to port 3001");
});
