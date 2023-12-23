const express = require("express");
const router = express.Router();
const { Category, validate } = require("../models/category");
const auth = require("../middleware/auth");
const vendor = require("../middleware/vendor");

// Route to get all product categories
router.get("/", [auth, vendor], async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

// Route to create a new product category
router.post("/", [auth, vendor], async (req, res) => {
  try {
    const { name } = req.body;
    const { error } = validate({ name });
    if (error) return res.status(400).send(error.details[0].message);

    const category = new Category({ name });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

module.exports = router;
