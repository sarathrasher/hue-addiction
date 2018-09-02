// ability to create a user from the front end, function that calls to the user route and creates username and password
// return token, puts in localStorage

// grabs the login info --> sends info to routes/login

let createButton = document.querySelector('.create-button');
let loginButton = document.querySelector('.login-button');
let loginForm = document.querySelector('.login-form');
let loginMessage = document.querySelector('.login-message');

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
  .then(response => response.json())
  .then(data => {
    if (data.error) {
      loginMessage.textContent = "Error.  User already registered.";
      loginMessage.classList.remove('remove');
      console.log(data.error);
    } else {
      createButton.classList.add('hidden');
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
createButton.addEventListener('click', createUser);
loginButton.addEventListener('click', loginUser);
automaticSignIn();

