const db = require('../database');

let formatData = (userId, data) => {
  let formattedData = {};
  for (entry of data) {
    if (entry[user_id] === userId) {
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
  }
  return formattedData;
}

let getGameData = (req, res) => {
  console.log('User: ' + req.user.id);
  let game_data = {};
  db.query(`SELECT user_id, stage, level, score, level_time FROM game`)
  .then(data => {
    res.send(formatData(req.user.id, data));
  })
  .catch(err => {
    res.send(err);
  });
}

let postGameData = (req, res) => {
  console.log(req.user);
}

module.exports = {postGameData, getGameData};