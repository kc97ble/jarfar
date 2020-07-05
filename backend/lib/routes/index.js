const express = require("express");
const utils = require("../utils");

const router = express.Router();

const SIMPLE_PAGE = [
  { url: "/", src: "trang-chu.md" },
  { url: "/pha-ky", src: "pha-ky.md" },
  { url: "/tu-duong", src: "tu-duong.md" },
];

SIMPLE_PAGE.forEach(({ url, src }) => {
  router.get(url, async function (_req, res, next) {
    try {
      const html = await utils.loadResourceAsHtml(src);
      res.render("simple_page", { html, everything: 42, t: utils.t });
    } catch (e) {
      next(e);
    }
  });
});

module.exports = router;
