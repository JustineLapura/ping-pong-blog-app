const express = require("express");
const Category = require("../models/categoryModel");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/", async (req, res) => {
  const categories = await Category.find({});
  res.status(200).json(categories);
});

module.exports = router;
