// ability to create a user from the front end, function that calls to the user route and creates username and password
// return token, puts in localStorage

// grabs the login info --> sends info to routes/login

let createButton = document.querySelector('.create-button');
let loginButton = document.querySelector('.login-button');
let loginForm = document.querySelector('.login-form');
let logOutBtn = document.querySelector('.nav-link-logout');
let loginMessage = document.querySelector('.login-message');

let createUser = (event) => {
  event.preventDefault();
  let email = document.querySelector('.login-email').value;
  let password = document.querySelector('.login-password').value;
  if (email.length < 2 || password.length < 2) {
    loginMessage.textContent = "Error.  Please make sure your username and password are more than two characters long.";
    loginMessage.classList.remove('remove');
    return;
  }
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
  .then(response => response.json())
  .then(data => {
    if (data.error) {
      loginMessage.textContent = "Error.  User already registered.";
      loginMessage.classList.remove('remove');
      console.log(data.error);
    } else {
      createButton.classList.add('remove');
      loginMessage.textContent = "User registered.  You may now login.";
      loginMessage.classList.remove('remove');
      console.log('Token created: ' + data.token);
    }
  })
}

let loginUser = (event) => {
  event.preventDefault();
  let email = document.querySelector('.login-email').value;
  let password = document.querySelector('.login-password').value;
  if (email.length < 2 || password.length < 2) {
    loginMessage.textContent = "Error.  Please make sure your username and password are more than two characters long.";
    loginMessage.classList.remove('remove');
    return;
  }
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
  .then(response => response.json()).then(data => {
    if (data.error) {
      loginMessage.textContent = "User could not login.  Check password.";
      loginMessage.classList.remove('remove');
      console.log(data.error);
    } else {
      localStorage.setItem("token", data.token);
      loginForm.reset();
      showInstructions();
      loginMessage.classList.add('remove');
    }
  })
  .catch(err => {
    loginMessage.textContent = "Error accessing server.";
    loginForm.reset();
    loginMessage.classList.remove('remove');
    console.log(err);
  })
}

//check to see if values in object are empty.
let validateUser = (user) => {
  if(user.email && user.user_password) {
    return true;
  }
  return false;
};

let automaticSignIn = () => {
  let checkUser;
  console.log('checking user');
  if(localStorage.getItem("token")) {
    checkUser = localStorage.getItem("token");
    fetch(`/api/signedin`, {
      method:"GET",
      headers: {
        "Content-Type": "application/json",
        "token": checkUser
      }
    })
    .then(response => 
        response.text())
    .then(message => {
      console.log(message);
      if(message === 'is user') {
        showInstructions();
      } else {
        showLogin();
      }
    })
  } else {
    showLogin();
  }
}

let logOut = () => {
  event.preventDefault();
  localStorage.removeItem("token");
  let game = document.querySelector('.game');
  game.classList.add('hidden');
  let instructions = document.querySelector('.instructions');
  instructions.classList.add('hidden');
  loginForm.classList.remove('hidden');
  let navBar = document.querySelector('.nav');
  navBar.classList.add('remove');
  createButton.classList.remove('remove');
  resetGame();
};

createButton.addEventListener('click', createUser);
loginButton.addEventListener('click', loginUser);
logOutBtn.addEventListener("click",logOut);
automaticSignIn();

