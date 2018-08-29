// ability to create a user from the front end, function that calls to the user route and creates username and password
// return token, puts in localStorage

// grabs the login info --> sends info to routes/login

let createButton = document.querySelector('.create-button');
let loginButton = document.querySelector('.login-button');
let loginForm = document.querySelector('.login-form');

let createUser = (event) => {
  event.preventDefault();
  let email = document.querySelector('.login-email').value;
  console.log(email);
  let password = document.querySelector('.login-password').value;
  console.log(password);
  let data ={emai: email, user_password: password};
  fetch('http://localhost:3000/users', {
    method: "POST", 
        mode: "no-cors",
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
      console.log(response);
  })
}


createButton.addEventListener('click', createUser);
// loginButton.addEventListener('submit', loginUser);

