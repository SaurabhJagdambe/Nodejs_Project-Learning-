const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// define the persons Schema

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["chef", "waiter", "manager"],
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  salary: {
    type: Number,
    required: true,
  },
  username: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
});

personSchema.pre("save", async function (next) {
  const person = this;

  // hash pass if only it is new or modified
  if (!person.isModified("password")) return next();

  try {
    //has pass genration
    const salt = await bcrypt.genSalt(10);

    //hash password
    const hashedPass = await bcrypt.hash(person.password, salt);

    //override plain password with hased pass
    person.password = hashedPass;
    next();
  } catch (error) {
    console.log(error);
    return next(error);
  }
});
personSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    //use bcrypt to compare the provided password with hased password
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    throw error;
  }
};

// Crreate Person model
const Person = mongoose.model("person", personSchema);
module.exports = Person;
