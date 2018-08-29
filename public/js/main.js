let loginBtn = document.querySelector(".login-button");
let createBtn = document.querySelector(".create-button");
let playBtn = document.querySelector(".nav-link-play");
let instructions = document.querySelector(".instructions");
let game = document.querySelector(".game");
let instructionsStartGame = document.querySelector(".start-button");
let statsBtn = document.querySelector(".nav-link-stat");

let showInstructions = () => {
  instructions.classList.remove("hidden");
  let form = document.querySelector(".login-form");
  form.classList.add("hide-form");
};

let showGame = () => {
  game.classList.remove("hidden");
  instructions.classList.add("hidden");
};

let showStats = () => {
  console.log('stats');
};

createBtn.addEventListener("click", showInstructions);
loginBtn.addEventListener("click", showInstructions);
instructionsStartGame.addEventListener("click", showGame);
statsBtn.addEventListener('click', showStats);
