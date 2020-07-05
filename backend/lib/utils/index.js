const path = require("path");
const fs = require("fs").promises;
const marked = require("marked");
const VI_JSON = require("./vi.json");

const ROOT_DIR = path.join(__dirname, "..", "..");
const VAR_DIR = path.join(ROOT_DIR, "var");

async function loadResourceAsString(fileName) {
  const filePath = path.join(VAR_DIR, fileName);
  const data = await fs.readFile(filePath);
  return data.toString();
}

async function loadResourceAsHtml(fileName) {
  const text = await loadResourceAsString(fileName);
  return marked(text);
}

function t(key) {
  return VI_JSON[key] || key;
}

module.exports = {
  ROOT_DIR,
  VAR_DIR,
  t,
  loadResourceAsString,
  loadResourceAsHtml,
};
