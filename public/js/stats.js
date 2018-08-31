let personalScore = document.querySelector('.personal-score');
let personalTime = document.querySelector('.personal-time');
let averageScore = document.querySelector('.average-score');
let averageTime = document.querySelector('.average-item');


let fetchScores = () => {
  let token = localStorage.getItem("token");
  fetch('/api/game_data',  {
    headers: {
      "token": token
    }
  }).then(res => {
    console.log(res);
    return res.json();
  })
  .then(data => {
    showStats();
    console.log(data);
  })
};




