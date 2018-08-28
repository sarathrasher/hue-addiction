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
// app.use(validateToken,authorization);

let formatData = (data) => {
  let solutionColors = []
  let decoyColors = []
  data[0].forEach(colorObject => {
    let solutionColor = colorObject.solution_color
    solutionColors.push(solutionColor)
  });
  data[1].forEach(colorObject => {
    let decoyColor = colorObject.decoy_color
    decoyColors.push(decoyColor)
  });
  let levelData = {solutionColors, decoyColors}

  return levelData
  
}

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
    let formattedData = formatData(data);
    console.log(formattedData);
    res.send(formattedData);
  })
  .catch(err => {
    console.log(err)
    res.send('There was an error in getting your data.');
  });
}

app.get('/level_data/:id', getLevelData)
router.post("/users", createUser);
app.listen(3000);