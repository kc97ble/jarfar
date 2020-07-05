const express = require("express");
const utils = require("../utils");

const router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  const html = await utils.loadResourceAsHtml("trang-chu.md");
  res.render("simple_page", { html });
});

module.exports = router;
