let startGameInstructions = document.querySelector(".start-button");
let statsBtn = document.querySelector(".nav-link-stats");

let form = document.querySelector(".login-form");
form.addEventListener("submit", e => {
  e.preventDefault();
  showInstructions();
});

let showInstructions = () => {
  let instructions = document.querySelector(".instructions");
  instructions.classList.remove("hidden");
  form.classList.add("hidden");
  return instructions;
};

let showGame = () => {
  let game = document.querySelector(".game");
  game.classList.remove("hidden");
  instructions.classList.add("hidden");
};

let showStats = () => {
  console.log("stats");
};

startGameInstructions.addEventListener("click", showGame);
statsBtn.addEventListener("click", showStats);
