const express = require("express");
const app = express();
const db = require("./db");
const Person = require("./models/person");
const Menu = require("./models/menu");

const bodyParser = require("body-parser");
const menu = require("./models/menu");
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Hello Saurabh");
});

// Post Method for Person
app.post("/person", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    //save new person to database

    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

//GET Metehod to get person info
app.get("/person", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

//Post for Menu
app.post("/menu", async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new Menu(data);
    //save new person to database

    const response = await newMenu.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

//GET Metehod to get Menu info
app.get("/menu", async (req, res) => {
  try {
    const data = await Menu.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});
app.listen(3001, () => {
  console.log("Listning to port 3001");
});
