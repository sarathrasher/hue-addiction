const {createUser, validateToken, loginUser} = require('./routes/login');
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = new express.Router();
const authRouter =  new express.Router();
const publicRouter = new express.Router();
const db = require('./database');
const authorization = require('./routes/authorize')

let allowCORS = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}

let formatData = (data) => {
  let solutionColors = [];
  let decoyColors = [];
  data[0].forEach(colorObject => {
    let solutionColor = colorObject.solution_color;
    solutionColors.push(solutionColor);
  });
  data[1].forEach(colorObject => {
    let decoyColor = colorObject.decoy_color;
    decoyColors.push(decoyColor);
  });
  let levelData = {solutionColors, decoyColors};

  return levelData;
}

let getLevelData = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  let promise1 = db.query(`SELECT DISTINCT solution_color
  FROM 
    solution_colors
  WHERE
    solution_colors.level = '${req.params.id}';`);
  let promise2 = db.query(`SELECT DISTINCT decoy_color
    FROM 
      decoy_colors
    WHERE
      decoy_colors.level = '${req.params.id}';`);
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

app.use(bodyParser.json());

publicRouter.post("/users", createUser);
publicRouter.post('/login', loginUser);
authRouter.use(validateToken);

authRouter.get('/level_data/:id', getLevelData)
app.use(express.static("public"));
app.use(allowCORS);
app.use(publicRouter);
app.use('/api', authRouter);
app.listen(3000);