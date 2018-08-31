let statsBtn = document.querySelector(".nav-link-stats");

let showLogin = () => {
  let loginForm = document.querySelector('.login-form');
  loginForm.classList.remove('hidden');
}

let showInstructions = () => {
  let form = document.querySelector('.login-form')
  let instructions = document.querySelector(".instructions");
  let navBar = document.querySelector('.nav');
  navBar.classList.remove('hidden');
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
  fetchScores();
};

statsBtn.addEventListener("click", showStats);