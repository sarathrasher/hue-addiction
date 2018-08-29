const secrets = require("./secrets");
const pg = require("pg-promise")();
const dbConfig = secrets.databaseURL
const db = pg(dbConfig);

module.exports = db;