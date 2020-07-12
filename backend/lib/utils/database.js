const fetch = require("node-fetch");
const papaparse = require("papaparse");

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/" +
  "1GEE_BOBKR1_YjwSIgLE4y7PCkcEsU4b4b0_7cq2ha4E" +
  "/export?format=csv&gid=0";

function transformHeader(header) {
  let m = header.match(/\[(.*)\]$/);
  return !!m ? m[1] : header;
}

const PAPAPARSE_CONFIG = {
  delimiter: ",",
  header: true,
  transformHeader: transformHeader,
};

function isValidUuid(s) {
  return s.length === 36;
}

class Person {
  constructor(data) {
    const { id, father_id, mother_id, husband_id, ...other_fields } = data;
    this.id = isValidUuid(id) ? id : null;
    this.father_id = isValidUuid(father_id) ? father_id : null;
    this.mother_id = isValidUuid(mother_id) ? mother_id : null;
    this.husband_id = isValidUuid(husband_id) ? husband_id : null;
    for (let key in other_fields) {
      this[key] = other_fields[key];
    }
  }

  static fromRow(obj, _fields) {
    return new Person(obj);
  }
}

class Database {
  async refresh() {
    // fetch csv
    const res = await fetch(CSV_URL);
    const text = await res.text();
    // convert csv to Array<Object>
    const { data, errors, meta } = papaparse.parse(text, PAPAPARSE_CONFIG);
    console.log(data, errors, meta);
    this.people = data.map((row) => Person.fromRow(row, meta.fields));
  }

  getAllPeople() {
    return this.people || [];
  }

  getRootId() {
    return this.people.find((p) => !p.father_id && !p.mother_id && !p.husband_id).id;
  }

  getPerson(id) {
    // very inefficient
    return this.people.find((p) => p.id === id);
  }

  getChildIds(id) {
    // very inefficient
    return this.people
      .filter((p) => p.father_id === id || p.mother_id === id)
      .map((p) => p.id);
  }

  getWifeIds(id) {
    // very inefficient
    return this.people.filter((p) => p.husband_id === id).map((p) => p.id);
  }

  getTree(id) {
    const root = this.getPerson(id);
    return {
      id: root.id,
      wives: this.getWifeIds(root.id).map((id) => this.getTree(id)),
      children: this.getChildIds(root.id).map((id) => this.getTree(id)),
    };
  }
}

const database = new Database();

module.exports = database;
