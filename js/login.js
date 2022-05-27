//Data storing into localstorage
function validateForm() {
  let data = localStorage.getItem("details")
    ? JSON.parse(localStorage.getItem("details"))
    : [];
  let formData = {
    name: document.getElementById("uName").value,
    email: document.getElementById("uEmail").value,
    password: document.getElementById("uPassword").value,
    confirmpassword: document.getElementById("confirmPassword").value,
  };
  data.push(formData);
  if (localStorage) {
    localStorage.setItem("details", JSON.stringify(data));
    console.log(localStorage);
  }
}
//Check if password is matching
function verifyPassword(input) {
  if (input.value != document.getElementById("uPassword").value) {
    input.setCustomValidity("Password Must be Matching");
  } else {
    input.setCustomValidity("");
  }
}
//check already registered users
function emailExist(value) {
  let existemail = JSON.parse(localStorage.getItem("details"));
  // [{email: 'user',...}, {email: 'user',...}]
  let emailid = existemail.map((user) => user.email);
  // ['user','user2']
  let getexistemail = emailid.filter((email) => {
    if (email == value.value) {
      value.setCustomValidity("email exist. try something else");
    } else {
      value.setCustomValidity("");
    }
  });
}
//Handling bubbling
const form = document.getElementById("registerForm");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  form.reset();
  document.getElementById("thankYou").style.display = "block";
  form.style.display = "none";
});

function showHide(show, hide) {
  let showEle = document.getElementById(show);
  let hideEle = document.getElementById(hide);
  showEle.style.display = "block";
  hideEle.style.display = "none";
}

//login here
function loginUser() {
  let loginName = document.getElementById("uName").value;
  let loginPass = document.getElementById("ePassword").value;
  let matchEmail = Array.from(JSON.parse(localStorage.getItem("details")));
  const userWanted = matchEmail.find(
    (user) => user.email === loginName && user.password === loginPass
  );
  if (!userWanted) {
    console.log("You have no registered with us");
    return;
  }
  matchEmail.forEach((user) => {
    if (user.email === loginName && user.password === loginPass) {
      user.logged = true;
    }
  });
  localStorage.setItem("details", JSON.stringify(matchEmail));
  console.log("You have successfully loged in");
  document.location.replace("./presupuesto.html");
}
const loginForm = document.getElementById("logIn");
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
});
