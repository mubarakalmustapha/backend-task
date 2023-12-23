const config = require("config");

module.exports = function (req, res, next) {
  if (!config.get("requiresAuth")) return next();

  if (req.user.userType !== "vendor") {
    return res
      .status(403)
      .send("Access denied. You are not authorized as a vendor.");
  }

  next();
};
