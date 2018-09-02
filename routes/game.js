const db = require('../database');

let formatData = data => {
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

let getGameData = (req, res) => {
  console.log(req.user.id);
  let userData = averageData = db.query(`SELECT stage, level, score, level_time FROM game WHERE user_id = ${req.user.id}`);
  let allData = db.query(`select stage, level, AVG (score) as score, AVG (level_time) as level_time FROM game GROUP BY stage, level`);
  Promise.all([userData, allData])
  .then(data => {
    console.log(data);
    let userData = formatData(data[0]);
    let averageData = formatData(data[1]);
    res.send({user: userData, average: averageData});
  })
  .catch(err => {
    res.send(err);
  });
}

let postGameData = (req, res) => {
  console.log('User: ' + req.user.id);
  console.log(req.body);
  db.query(`UPDATE game SET score=${req.body.score}, level_time=${req.body.time} WHERE user_id=${req.user.id} AND stage=${req.body.stage} AND level=${req.body.level} RETURNING *`)
  .then(data => {
    if (data.length === 0) {
      db.query(`INSERT INTO game
      (user_id, stage, level, score, level_time)
      VALUES
      (${req.user.id}, ${req.body.stage}, ${req.body.level}, ${req.body.score}, ${req.body.time}) RETURNING *`)
      .then(data => {
        console.log(data);
        res.send(data);
      })
    } else {
      console.log(data);
      res.send(data);
    }
  })
  .catch(err => {
    console.log(err);
    res.end('Error');
  })
}

module.exports = {postGameData, getGameData};