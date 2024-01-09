const express = require("express");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const router = express.Router();

// Create Token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// GET Users
router.get("/", async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });
  res.status(200).json(users);
});

// Register user
router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;

  let emptyFields = [];

  if (!username) {
    emptyFields.push("username");
  }
  if (!email) {
    emptyFields.push("email");
  }
  if (!password) {
    emptyFields.push("password");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "You must fill in all the fields", emptyFields });
  }

  const usernameExists = await User.findOne({ username });
  const emailExists = await User.findOne({ email });

  if (usernameExists) {
    return res.status(400).json({ error: "Username already in use" });
  }

  if (emailExists) {
    return res.status(400).json({ error: "Email already in use" });
  }

  // Validation
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Email is not valid" });
  }

  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({ error: "Password not strong enough" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      username,
      password: hashedPassword,
      email,
    });

    const token = createToken(user._id);
    res.status(200).json({ mssg: "Successfuly registered", user, token });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: "Failed to create user. Please try again" });
  }
});

// Login an existing user
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  let emptyFields = [];

  if (!username) {
    emptyFields.push("username");
  }
  if (!password) {
    emptyFields.push("password");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "You must fill in all the fields", emptyFields });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "Incorrect username." });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      console.log(password, user.password);
      return res.status(400).json({ error: "Incorrect password" });
    }

    const token = createToken(user._id);
    res.status(200).json({ mssg: "Successfuly logged in", user, token });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

module.exports = router;
