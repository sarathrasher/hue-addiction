let personalScore = document.querySelector('.personal-score');
let personalTime = document.querySelector('.personal-time');
let averageScore = document.querySelector('.average-score');
let averageTime = document.querySelector('.average-time');
let leader1Name = document.querySelector('.leader1-name');
let leader1Score = document.querySelector('.leader1-score');
let leader1Time = document.querySelector('.leader1-time');
let leader2Name = document.querySelector('.leader2-name');
let leader2Score = document.querySelector('.leader2-score');
let leader2Time = document.querySelector('.leader2-time');
let leader3Name = document.querySelector('.leader3-name');
let leader3Score = document.querySelector('.leader3-score');
let leader3Time = document.querySelector('.leader3-time');
let levelLinks = document.querySelectorAll('.level-link');
let statsHeading = document.querySelector('.stats-heading');

let insertStatsData = (level, data) => {
  if (level === 0) {
    statsHeading.textContent = 'Total';
  } else {
    statsHeading.textContent = 'Level: ' + level;
    console.log(level);
  }
  let statsObject = data;
  let averageScoreContent = statsObject.average.score;
  averageScore.textContent = `Average score: ${averageScoreContent}`;

  let averageTimeContent = statsObject.average.time;
  console.log(averageTimeContent)
  averageTime.textContent = `Average time: ${averageTimeContent}`;

  let personalScoreContent = statsObject.user.score;
  console.log(personalScoreContent)
  personalScore.textContent = `Your score: ${personalScoreContent}`;

  let personalTimeContent = statsObject.user.time;
  console.log(personalTimeContent)
  personalTime.textContent = `Your time: ${personalTimeContent}`;

  let leader1NameContent = statsObject.leaders[0].email;
  console.log(leader1NameContent)
  leader1Name.textContent = `1. ${leader1NameContent}`;

  let leader1ScoreContent = statsObject.leaders[0].score;
  console.log(leader1ScoreContent)
  leader1Score.textContent = `Score: ${leader1ScoreContent}`;

  let leader1TimeContent = statsObject.leaders[0].time;
  console.log(leader1TimeContent)
  leader1Time.textContent = `Time: ${leader1TimeContent}`;

  let leader2NameContent = statsObject.leaders[1].email;
  console.log(leader2NameContent)
  leader2Name.textContent = `2. ${leader2NameContent}`;

  let leader2ScoreContent = statsObject.leaders[1].score;
  console.log(leader2ScoreContent)
  leader2Score.textContent = `Score: ${leader2ScoreContent}`;

  let leader2TimeContent = statsObject.leaders[1].time;
  console.log(leader2TimeContent)
  leader2Time.textContent = `Time: ${leader2TimeContent}`;

  let leader3NameContent = statsObject.leaders[2].email;
  console.log(leader3NameContent)
  leader3Name.textContent = `3. ${leader3NameContent}`;

  let leader3ScoreContent = statsObject.leaders[2].score;
  console.log(leader3ScoreContent)
  leader3Score.textContent = `Score: ${leader3ScoreContent}`;

  let leader3TimeContent = statsObject.leaders[2].time;
  console.log(leader3TimeContent)
  leader3Time.textContent = `Time: ${leader3TimeContent}`;
};

let fetchScores = (stage, level) => {
  let token = localStorage.getItem("token");
  fetch(`/api/game_data/${stage}/${level}`,  {
    headers: {
      "token": token
    }
  }).then(res => {
    console.log(res);
    return res.json();
  })
  .then(data => {
    insertStatsData(level, data);  // Level 0 stores total scores/times.
    console.log(data);
  })
};

document.querySelector('.level-total').addEventListener('click', event => {
  event.preventDefault();
  let level = 0; // Level 0 stores total scores/times.
  fetchScores(stage, level); 
})
for (levelLink of levelLinks) {
  levelLink.addEventListener('click', (event) => {
    event.preventDefault();
    let level = event.target.textContent;
    fetchScores(stage, level);
  });
}






