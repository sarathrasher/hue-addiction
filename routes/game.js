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

let getGameDataByLevel = (req, res) => {
  let userData = db.one(`SELECT score, level_time AS time FROM game WHERE user_id = ${req.user.id} AND level=${req.params.level} AND stage=${req.params.stage}`);
  let averageData = db.one(`SELECT ROUND(AVG(score), 2) as score, ROUND(AVG(level_time), 2) AS time FROM game WHERE level=${req.params.level} AND stage=${req.params.stage}`);
  let leaderData = db.query(`SELECT users.email, game.score, game.level_time AS time FROM game INNER JOIN users ON game.user_id=users.id WHERE level=${req.params.level} AND stage=${req.params.stage} ORDER BY score DESC LIMIT 3`);
  Promise.all([userData, averageData, leaderData])
  .then(data => {
    let user = data[0];
    let average = data[1];
    let leaders = data[2];
    res.send({user, average, leaders});
  })
  .catch(err => {
    res.send({error: err});
  })
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

module.exports = {postGameData, getGameDataByLevel};