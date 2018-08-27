const secrets = require('./secrets')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pg = require('pg-promise')();
const dbConfig = 'postgres://' + secrets.username +'@localhost:5432/hue-addiction';
const db = pg(dbConfig);

app.use(bodyParser.json());
app.use(express.static('public'));

app.listen(3000);