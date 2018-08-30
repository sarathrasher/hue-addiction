let statsBtn = document.querySelector(".nav-link-stats");

let showInstructions = () => {
  let form = document.querySelector('.login-form')
  let instructions = document.querySelector(".instructions");
  instructions.classList.remove("hidden");
  form.classList.add("hidden");
  return instructions;
};

let showStats = () => {
  console.log("stats");
};

statsBtn.addEventListener("click", showStats);
