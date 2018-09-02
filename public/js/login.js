// ability to create a user from the front end, function that calls to the user route and creates username and password
// return token, puts in localStorage

// grabs the login info --> sends info to routes/login

let createButton = document.querySelector('.create-button');
let loginButton = document.querySelector('.login-button');
let loginForm = document.querySelector('.login-form');
let logOutBtn = document.querySelector('.nav-link-logout');

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
  .then(() => {
    if(!validateUser(data)) {
      loginForm.setAttribute('disabled');
    }
    createButton.classList.add('hidden');
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
        if(!response || !validateUser(data)) {
          let message = document.querySelector('.show-message');
          message.classList.remove('hidden');    
          loginForm.setAttribute('disabled');
        }
        let message = document.querySelector('.show-message');
        message.classList.add('hidden');    
        localStorage.setItem("token", token);
        loginForm.reset();
        showInstructions();
      })
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
  localStorage.removeItem("token");
  let game = document.querySelector('.game');
  game.classList.add('hidden');
  let logoutLink = document.querySelector('.nav-logout');
  logoutLink.classList.add('logout-remove');
  let instructions = document.querySelector('.instructions');
  instructions.classList.add('hidden');
  loginForm.classList.remove('hidden');
};

createButton.addEventListener('click', createUser);
loginButton.addEventListener('click', loginUser);
logOutBtn.addEventListener("click",logOut);
automaticSignIn();

