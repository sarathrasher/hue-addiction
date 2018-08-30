const {createUser, validateToken, loginUser} = require('./routes/login');
const getLevelData = require('./routes/levels');
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = new express.Router();
const authRouter =  new express.Router();
const publicRouter = new express.Router();
const authorization = require('./routes/authorize')
const userId = new express.Router();

let allowCORS = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}

app.use(bodyParser.json());

publicRouter.post("/users", createUser);
publicRouter.post('/login', loginUser);
authRouter.use(validateToken);

authRouter.get('/level_data/:id', getLevelData)
authRouter.get('/signedin',(req,res) => {
  res.send('is user');
});
app.use(express.static("public"));
app.use(allowCORS);
app.use(publicRouter);
app.use('/api', authRouter);
app.listen(3000);