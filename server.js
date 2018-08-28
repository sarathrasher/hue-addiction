const {createUser, validateToken} = require('./routes/login');
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router =  new express.Router();
const db = require('./database');
const authorization = require('./routes/authorize')

app.use(express.static("public"));
app.use(bodyParser.json());

app.use(router);
app.use(validateToken,authorization);
router.post("/users", createUser);
app.listen(3000);

module.exports = db;