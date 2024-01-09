const express = require("express");
const mongoose = require("mongoose");
const Post = require("../models/postModel");
const { createPost } = require("../controllers/blogControllers");

const router = express.Router();

// CREATE Post
router.post("/", async (req, res) => {
  const { title, desc } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!desc) {
    emptyFields.push("desc");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  const titleExists = await Post.findOne({ title });
  if (titleExists) {
    return res
      .status(400)
      .json({ error: "Title already in use... Please try another title" });
  }

  try {
    const post = await Post.create(req.body);
    res.status(200).json({ mssg: "Post has been made", post });
  } catch (error) {
    res.status(400).json(error);
  }
});

// UPDATE Post
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, desc } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such post" });
  }

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!desc) {
    emptyFields.push("desc");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  const titleExists = await Post.findOne({ title });
  if (titleExists) {
    return res
      .status(400)
      .json({ error: "Title already in use... Please try another title" });
  }

  try {
    const post = await Post.findById(id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (error) {
        res.status(400).json(error);
      }
    } else {
      res.status(400).json({ error: "You can only update your post" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

// DELETE Post
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such post" });
  }
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(400).json({ error: "Post not found" });
    }
    if (post.username === req.body.username) {
      try {
        const deletedPost = await Post.findByIdAndDelete(id);
        res.status(200).json({ mssg: "Post has been deleted", deletedPost });
      } catch (error) {
        res.status(400).json(error);
      }
    } else {
      res.status(400).json({ error: "You can only delete your post" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

// GET posts
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;

  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find({});
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET Post
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such post" });
  }
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(200).json({ error: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
