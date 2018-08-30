// ability to create a user from the front end, function that calls to the user route and creates username and password
// return token, puts in localStorage

// grabs the login info --> sends info to routes/login

let createButton = document.querySelector('.create-button');
let loginButton = document.querySelector('.login-button');
let loginForm = document.querySelector('.login-form');

let createUser = (event) => {
  event.preventDefault();
  let email = document.querySelector('.login-email').value;
  let password = document.querySelector('.login-password').value;
  let data ={email: email, user_password: password};
  fetch('/users', {
    method: "POST", 
        cache: "no-cache", 
        credentials: "same-origin", 
        headers: {
          "content-type": "application/json"
        },
        redirect: "follow", 
        referrer: "no-referrer", 
        body: JSON.stringify(data),
  })
  .then(response => {
    loginForm.reset()
    console.log(response);
    getLevelData(level);
    showInstructions();
  })
}

let loginUser = (event) => {
  event.preventDefault();
  let email = document.querySelector('.login-email').value;
  let password = document.querySelector('.login-password').value;
  let data ={email: email, user_password: password};
  fetch('/login', {
    method: "POST", 
        cache: "no-cache", 
        credentials: "same-origin", 
        headers: {
          "content-type": "application/json",
        },
        redirect: "follow", 
        referrer: "no-referrer", 
        body: JSON.stringify(data),
  })
  .then(response => {
      response.text().then(token => {
        console.log(token);
        localStorage.setItem("token", token);
        loginForm.reset();
        getLevelData(level);
        showInstructions();
      })
  })
}

createButton.addEventListener('click', createUser);
loginButton.addEventListener('click', loginUser);

