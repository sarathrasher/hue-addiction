let getGameData = (req, res) => {
  console.log('User: ' + req.user.id);
  
}

let postGameData = (req, res) => {
  console.log(req.user);
}

module.exports = {postGameData, getGameData};