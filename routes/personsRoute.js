const express = require("express");
const router = express.Router();
const Person = require("../models/person");
const { jwtAuthMiddleware, genrateToken } = require("../jwt");
// Post Method for Person
router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);

    //save new person to database
    const response = await newPerson.save();
    console.log("data saved");

    //Genrate JWT Token
    const payload = {
      id: response.id,
      username: response.username,
    };
    console.log(JSON.stringify(payload));
    const token = genrateToken(payload);
    console.log("Token : ", token);

    res.status(200).json({ response: response, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

//LOgin Route
router.post("/login", async (req, res) => {
  try {
    // Extract username and password from req body
    const { username, password } = req.body;

    //find the user by username
    const user = await Person.findOne({ username: username });

    //if user not exist
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "invalid username or Paasword" });
    }

    //Genrate JWT Token
    const payload = {
      id: user.id,
      username: user.username,
    };

    const token = genrateToken(payload);
    //return token as response
    res.json({ token });
  } catch (error) {
    console.error(err);
    res.status(500).json({ error: "Internal server Error" });
  }
});

// Profile route
router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user;
    console.log("User Data: ", userData);

    const userId = userData.id;
    const user = await Person.findById(userId);

    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//GET Metehod to get person info
router.get("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

//parameterized Call for person work
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType; //extracts the work type from the URl parameter
    if (workType === "chef" || workType === "manger" || workType === "waiter") {
      const response = await Person.find({ work: workType });
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
    const personId = req.params.id; //Extract id from URL
    const updatedPersonData = req.body; //updated data for person

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true, // returns the updated document
        runValidators: true, // run mongoose validator
      }
    );
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
    const personId = req.params.id; //Extract id from URL

    //Assuming you have person Model
    const response = await Person.findByIdAndDelete(personId);
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
