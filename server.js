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

let getLevelData = (req, res) => {
  let promise1 = db.query(`SELECT DISTINCT solution_color
  FROM 
    solution_colors
  WHERE
    solution_colors.level = '${req.params.id}';`)
  let promise2 = db.query(`SELECT DISTINCT decoy_color
    FROM 
      decoy_colors
    WHERE
      decoy_colors.level = '${req.params.id}';`)
  Promise.all([promise1, promise2])
    .then(data => {
    console.log(data);
    res.send(data);
  })
  .catch(err => {
    console.log(err)
    res.send('There was an error in getting your data.');
  });
}

app.get('/level_data/:id', getLevelData)
router.post("/users", createUser);
app.listen(3000);