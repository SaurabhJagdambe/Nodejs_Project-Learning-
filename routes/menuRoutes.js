const express = require("express");
const router = express.Router();
const Menu = require("../models/menu");

//Post for Menu
router.post("/", async (req, res) => {
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
router.get("/", async (req, res) => {
  try {
    const data = await Menu.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});
//parameterized Call for person work
router.get("/:taste", async (req, res) => {
  try {
    const taste = req.params.taste; //extracts the work type from the URl parameter
    if (taste === "sweet" || taste === "spicy" || taste === "sour") {
      const response = await Menu.find({ taste: taste });
      res.status(404).json(response);
    } else {
      res.status(404).json({ error: "Not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

//Update the data by id
router.put("/:id", async (req, res) => {
  try {
    const menuId = req.params.id; //Extract id from URL
    const updatedMenuData = req.body; //updated data for person

    const response = await Menu.findByIdAndUpdate(menuId, updatedMenuData, {
      new: true, // returns the updated document
      runValidators: true, // run mongoose validator
    });
    if (!response) {
      return res.status.apply(404).json({ error: "Person not Found" });
    }
    console.log("data Updated");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

//Delete the data by id
router.delete("/:id", async (req, res) => {
  try {
    const menuId = req.params.id; //Extract id from URL

    //Assuming you have person Model
    const response = await Menu.findByIdAndDelete(menuId);
    if (!response) {
      return res.status.apply(404).json({ error: "Person not Found" });
    }
    console.log("data Deleted");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
