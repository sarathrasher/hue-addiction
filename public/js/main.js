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

// debugging game data fetch
let token = localStorage.getItem("token");
fetch('/api/game_data/1',  {
  headers: {
    "token": token
  }
}).then(res => {
  console.log(res);
  return res.json();
})
.then(data => {
  console.log(data);
});