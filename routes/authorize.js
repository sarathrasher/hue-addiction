const express = require('express');
const authorization = new express.Router();

authorization.get('/test', (req,res) => {
  res.send('i ran');
});





module.exports = authorization;