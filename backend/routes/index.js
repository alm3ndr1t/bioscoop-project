const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  // res.render("index", { title: "Web 3" });
  res.send("Home pad");
});

module.exports = router;
