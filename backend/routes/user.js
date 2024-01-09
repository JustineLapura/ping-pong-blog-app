const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const User = require("../models/userModel");
const Post = require("../models/postModel");

const router = express.Router();

// UPDATE user
router.put("/:id", async (req, res) => {
  const { username, email, password } = req.body;

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
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // Check if username or email already exists
  if (username) {
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ error: "Username already in use" });
    }
  }

  if (email) {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ error: "Email already in use" });
    }
  }

  // Validation
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Email is not valid" });
  }

  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({ error: "Password not strong enough" });
  }

  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json({ mssg: "User Updated Successfuly", updatedUser });
    } catch (error) {
      res.status(400).json(error);
    }
  } else {
    res.status(400).json({ error: "You can only update your account" });
  }
});

// DELETE user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ mssg: "User Deleted Successfuly" });
      } catch (error) {
        res.status(400).json(error);
      }
    } catch (error) {
      res.status(401).json({ error: "User not found" });
    }
  } else {
    res.status(400).json({ error: "You can only delete your account" });
  }
});

// GET User
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }

  const user = await User.findById(id);
  const { password, ...others } = user._doc;
  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  res.status(200).json(others);
});

module.exports = router;
