const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const path = require("path");
const utils = require("../utils");

/* GET users listing. */
router.get("/", async function (req, res) {
  const data = await fs.readFile(path.join(utils.VAR_DIR, "42.txt"));
  res.send(data.toString());
});

module.exports = router;
