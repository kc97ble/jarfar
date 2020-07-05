const express = require("express");
const utils = require("../utils");
const path = require("path");

const router = express.Router();

router.get("/", function (req, res, next) {
  res.render("pha-do", { t: utils.t });
});

module.exports = router;
