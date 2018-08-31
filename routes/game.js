const db = require('../database');

let formatUserData = data => {
  let formattedData = {};
  for (entry of data) {
    if (!formattedData['stage' + entry.stage]) {
      formattedData['stage' + entry.stage] = {};
    }
    if (!formattedData['stage' + entry.stage][entry.level]) {
      formattedData['stage' + entry.stage][entry.level] = {};
    }
    formattedData['stage' + entry.stage][entry.level].score = entry.score;
    formattedData['stage' + entry.stage][entry.level].time = entry.level_time;
  }
  return formattedData;
}

let formatAverageData = data => {
  let formattedData = {};
  for (entry of data) {
    if (!formattedData['stage' + entry.stage]) {
      formattedData['stage' + entry.stage] = {};
    }
    if (!formattedData['stage' + entry.stage][entry.level]) {
      formattedData['stage' + entry.stage][entry.level] = {};
      formattedData['stage' + entry.stage][entry.level].score = entry.score;
      formattedData['stage' + entry.stage][entry.level].time = entry.level_time;
      formattedData['stage' + entry.stage][entry.level].num_users = 1;
    } else {
      formattedData['stage' + entry.stage][entry.level].num_users++;
      formattedData['stage' + entry.stage][entry.level].score = (formattedData['stage' + entry.stage][entry.level].score + entry.score) / formattedData['stage' + entry.stage][entry.level].num_users;
      formattedData['stage' + entry.stage][entry.level].time = (formattedData['stage' + entry.stage][entry.level].score + entry.level_time) / formattedData['stage' + entry.stage][entry.level].num_users;
    }
  }
  return formattedData;
}

let getGameData = (req, res) => {
  console.log(req.user.id);
  let userData = averageData = db.query(`SELECT stage, level, score, level_time FROM game WHERE user_id = ${req.user.id}`);
  let allData = db.query(`SELECT stage, level, score, level_time FROM game`);
  Promise.all([userData, allData])
  .then(data => {
    console.log(data);
    let userData = formatUserData(data[0]);
    let averageData = formatAverageData(data[1]);
    res.send({user: userData, average: averageData});
  })
  .catch(err => {
    res.send(err);
  });
}

let postGameData = (req, res) => {
  console.log('User: ' + req.user.id);
  console.log(req.body);
  res.send(req.body);
}

module.exports = {postGameData, getGameData};