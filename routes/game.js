const db = require('../database');

let formatData = (userId, data) => {
  let formattedData = {};
  for (entry of data) {
    console.log(entry, userId);
    if (!formattedData['stage' + entry.stage]) {
      formattedData['stage' + entry.stage] = {};
    }
    if (!formattedData['stage' + entry.stage][entry.level]) {
      formattedData['stage' + entry.stage][entry.level] = {};
    }
    if (!formattedData['stage' + entry.stage][entry.level][entry.user_id]) {
      formattedData['stage' + entry.stage][entry.level][entry.user_id] = {};
    }
    formattedData['stage' + entry.stage][entry.level][entry.user_id].score = entry.score;
    formattedData['stage' + entry.stage][entry.level][entry.user_id].time = entry.level_time;
  }
  return formattedData;
}

let getGameData = (req, res) => {
  db.query(`SELECT user_id, stage, level, score, level_time FROM game`)
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