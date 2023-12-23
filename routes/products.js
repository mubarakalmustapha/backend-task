const express = require("express");
const router = express.Router();
const { Product, validate } = require("../models/product");
const { Category } = require("../models/category");
const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const vendor = require("../middleware/vendor");
const cloudinary = require("../utils/cloudinary");

// Route to get all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Product.find();
    res.send(categories);
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .send({ error: "Internal server error", details: error.message });
  }
});

// Route to get products by category
router.get("/:categoryId", validateObjectId, async (req, res) => {
  const categoryId = req.params.categoryId;
  try {
    const products = await Product.find({ categoryId });
    res.send(products);
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .send({ error: "Internal server error", details: error.message });
  }
});

// Route to create a new product with Cloudinary image upload
router.post("/", [auth, vendor], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    // Find the category by ID first to make sure we have it in our database
    const category = await Category.findById(req.body.categoryId);
    if (!category)
      return res
        .status(400)
        .send("The category with the giving ID was not found");

    // Upload image to Cloudinary
    const result = await cloudinary.v2.uploader.upload(req.body.productImage);

    // Create a new product with the Cloudinary image URL
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      ingredients: req.body.ingredients,
      categoryId: req.body.categoryId,
      defaultPrice: req.body.defaultPrice,
      salesPrice: req.body.defaultPrice,
      requiredOptions: req.body.requiredOptions,
      productImage: result.secure_url,
    });

    await product.save();
    res.send(product);
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .send({ error: "Internal server error", details: error.message });
  }
});

module.exports = router;
