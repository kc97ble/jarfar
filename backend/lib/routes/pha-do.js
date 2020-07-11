const express = require("express");
const utils = require("../utils");
const path = require("path");
const database = require("../utils/database");

const router = express.Router();

router.get("/", function (req, res, next) {
  res.render("pha-do", { t: utils.t, secret: 42 });
});

module.exports = router;
