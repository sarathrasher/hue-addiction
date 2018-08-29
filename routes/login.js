const db = require("../database");
const jwt = require("jsonwebtoken");
const {password} = require('../secrets');

let createUser = (req, res, next) => {
  let newUser = {
    email: req.body.email,
    password: req.body.user_password
  };
  db.one(
    `INSERT INTO users (email, user_password) 
    VALUES ($1, $2)
    RETURNING *;`,
    [newUser.email, newUser.password]
  )
    .then(data => {
      console.log(data);
      let token = jwt.sign({ id: data.id }, password, { expiresIn: "1d" });
      res.send(token);
    })
    .catch(err => console.log(err));
};

let validateToken = async (req, res, next) => {
  let token = req.headers.token;
  console.log(token);
  let payload;
  try {
    payload = await jwt.verify(token, password);
  } catch (err) {
    console.log(err);
  }

  if (payload) {
    req.user = payload;
    next();
  } else {
    res.send("invalid token");
  }
};

// Log in method
//Select from database
// 

let loginUser = (req, res, next) => {
  let userInput = {
    email: req.body.email,
    password: req.body.user_password
  };
  db.one(
    `SELECT 
      email, user_password
    FROM
      users
    WHERE
    email = $1 and user_password = $2;`,
    [userInput.email, userInput.password]
  )
    .then(data => {
      let token = jwt.sign({ id: data.id }, password, { expiresIn: "1d" });
      res.send(token);
    })
    .catch(err => console.log(err));
};

module.exports = { createUser, validateToken, loginUser };
