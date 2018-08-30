const db = require('../database');

let formatData = data => {
  let formattedData = {};
  console.log('Formatting data...')
  for (entry of data) {
    console.log(entry);
    if (!formattedData['stage' + entry.stage]) {
      formattedData['stage' + entry.stage] = {};
    }
    if (!formattedData['stage' + entry.stage][entry.level]) {
      formattedData['stage' + entry.stage][entry.level] = {};
      formattedData['stage' + entry.stage][entry.level].user = {};
    }
    formattedData['stage' + entry.stage][entry.level].user.score = entry.score;
    formattedData['stage' + entry.stage][entry.level].user.time = entry.level_time;
  }
  return formattedData;
}

let getGameData = (req, res) => {
  console.log(req.user.id);
  db.query(`SELECT stage, level, score, level_time FROM game WHERE user_id = ${req.user.id}`)
  .then(data => {
    res.send(formatData(data));
  })
  .catch(err => {
    res.send(err);
  });
}

let postGameData = (req, res) => {
  console.log('User: ' + req.user.id);
  console.log(req.user);
}

module.exports = {postGameData, getGameData};