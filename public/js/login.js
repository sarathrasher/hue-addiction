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
      if(message === 'is user') {
          showInstructions();   
      } else {
        showLogin();
      }
    })
  }  
}
createButton.addEventListener('click', createUser);
loginButton.addEventListener('click', loginUser);
automaticSignIn();

