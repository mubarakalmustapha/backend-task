const users = require("../routes/users");
const auth = require("../routes/auth");
const products = require("../routes/products");
const categories = require("../routes/categories");

module.exports = function (app) {
  // Routes
  app.use("/api/register", users);
  app.use("/api/login", auth);
  app.use("/api/products", products);
  app.use("/api/product-categories", categories);
};
