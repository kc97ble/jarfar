const express = require("express");
const utils = require("../utils");
const path = require("path");
const database = require("../utils/database");

const router = express.Router();

router.get("/:id", function (req, res, next) {
  const { id } = req.params;
  const person = database.getPerson(id);
  const father = person.father_id ? database.getPerson(person.father_id) : null;
  const mother = person.mother_id ? database.getPerson(person.mother_id) : null;
  const husband = person.husband_id ? database.getPerson(person.husband_id) : null;
  const wives = database.getWifeIds(id).map((id) => database.getPerson(id));
  const children = database.getChildIds(id).map((id) => database.getPerson(id));
  res.render("person", {
    t: utils.t,
    person: person,
    father: father,
    mother: mother,
    husband: husband,
    wives: wives,
    children: children,
  });
});

router.get("/", function (req, res, next) {
  const people = database.getAllPeople();
  const tree = database.getTree(database.getRootId());
  res.render("tree", { t: utils.t, people: people, tree: tree });
});

module.exports = router;
