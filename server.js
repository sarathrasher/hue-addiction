const secrets = require('./secrets')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pg = require('pg-promise')();
const dbConfig = 'postgres://' + secrets.username +'@localhost:5432/hue-addiction';
const db = pg(dbConfig);

let getLevelData = (req, res) => {
  db.query(`SELECT DISTINCT solution_color, decoy_color
  FROM 
    solution_colors, decoy_colors
  WHERE
    solution_colors.level = '${req.params.id}' and decoy_colors.level = '${req.params.id}';`)
  .then(data => {
    console.log(data);
    res.send(data);
  })
  .catch(err => {
    console.log(err)
    res.send('There was an error in getting your data.');
  });
}

app.use(bodyParser.json());
app.use(express.static('public'));
app.get('/level_data/:id', getLevelData)

app.listen(3000);
