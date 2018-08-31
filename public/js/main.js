let statsBtn = document.querySelector(".nav-link-stats");

let showInstructions = () => {
  let form = document.querySelector('.login-form')
  let instructions = document.querySelector(".instructions");
  form.classList.add("hidden");
  instructions.classList.remove("hidden");
  return instructions;
};

let showStats = () => {
  let statsPage = document.querySelector('.stats');
  let game = document.querySelector('.game');
  let instructions = document.querySelector('.instructions');
  game.classList.add('hidden');
  instructions.classList.add('hidden');
  statsPage.classList.remove('hidden');
};

statsBtn.addEventListener("click", showStats);

let level_data = {
  stage: '1',
  level: '1',
  score: '35',
  time: '10'
};
console.log(JSON.stringify(level_data));
let token = localStorage.getItem("token");
console.log(token);
fetch('/api/game_data',  {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "token": token
  },
  body: JSON.stringify(level_data)
}).then(res => {
  console.log(res);
  return res.json();
})
.then(data => {
  console.log(data);
});
