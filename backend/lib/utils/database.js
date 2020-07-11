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

class Person {
  constructor(data) {
    const { id, father_id, mother_id, husband_id, ...other_fields } = data;
    this.id = id;
    this.father_id = father_id;
    this.mother_id = mother_id;
    this.husband_id = husband_id;
    this.other_fields = other_fields;
  }

  static fromRow(obj, _fields) {
    return new Person(obj);
  }
}

class Database {
  constructor() {
    this.refresh();
  }

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
    return this.people;
  }
}

const database = new Database();

module.exports = database;
