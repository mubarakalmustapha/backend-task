const mongoose = require("mongoose");
const Joi = require("joi");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  ingredients: String,
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  defaultPrice: {
    type: Number,
    required: true,
  },
  salesPrice: Number,
  productImage: String,
  requiredOptions: [
    {
      name: String,
      choice: String,
      required: Boolean,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);

function validateProduct(product) {
  const schema = Joi.object({
    name: Joi.string().required().label("Name"),
    description: Joi.string().label("Description"),
    ingredients: Joi.string().label("Ingredients"),
    categoryId: Joi.string().required().label("Category ID"),
    defaultPrice: Joi.number().required().label("Default Price"),
    salesPrice: Joi.number().label("Sales Price"),
    productImage: Joi.string().label("Product Image"),
    requiredOptions: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().required().label("Option Name"),
          choice: Joi.string().required().label("Option Choice"),
          required: Joi.boolean().valid(true).label("Is Required"),
        })
      )
      .label("Required Options"),
  }).label("Product");

  return schema.validate(product);
}

exports.Product = Product;
exports.validate = validateProduct;
