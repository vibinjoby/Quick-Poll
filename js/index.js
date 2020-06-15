window.onload = function() {
  document.getElementById("loginContainer").onclick = onLoginClick;
  document.getElementById("logoContainer").onclick = onLogoClick;
  gsap.from(".pollBtn", { duration: 1, z: -200, opacity: 0, scale: 0.5 });
  gsap.from("#content", { duration: 1, z: -200, opacity: 0, scale: 0.5 });
  gsap.from("#logoLarge", {
    duration: 1,
    z: -200,
    opacity: 0,
    scale: 0.5
  });

  //Form validations
  // Sign in
  const signinForm = document.getElementById("signin-form");
  const si_pwd = document.getElementById("signin_pwd");
  const si_email = document.getElementById("signin_email");

  // Sign up
  const signupForm = document.getElementById("form");
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirm_password = document.getElementById("confirm_password");

  const signupFormHandler = e => {
    e.preventDefault();
    checkInputsForSignup();
  };

  const signinFormHandler = e => {
    e.preventDefault();
    checkInputsForSignin();
  };

  signupForm.addEventListener("submit", e => {
    signupFormHandler(e);
  });

  signinForm.addEventListener("submit", e => {
    signinFormHandler(e);
  });

  function checkInputsForSignin() {
    let isValidEmail = false,
      isValidPwd = false;

    const emailValue = si_email.value.trim();
    const passwordValue = si_pwd.value.trim();
    if (emailValue === "") {
      setErrorFor(si_email, "Email cannot be blank");
      isValidEmail = false;
    } else if (!isEmail(emailValue)) {
      setErrorFor(si_email, "Not a valid email");
      isValidEmail = false;
    } else {
      setSuccessFor(si_email);
      isValidEmail = true;
    }

    if (passwordValue === "") {
      setErrorFor(si_pwd, "Password cannot be blank");
      isValidPwd = false;
    } else {
      setSuccessFor(si_pwd);
      isValidPwd = true;
    }

    //If the email and password is valid call the sign in arrow function
    isValidEmail && isValidPwd && signin();
  }

  function checkInputsForSignup() {
    // trim to remove the whitespaces
    let isValidEmail = false,
      isValidUsername = false,
      isValidPwd = false,
      isValidConfirmPwd = false;
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const confirm_passwordValue = confirm_password.value.trim();

    if (usernameValue === "") {
      setErrorFor(username, "Username cannot be blank");
      isValidUsername = false;
    } else {
      setSuccessFor(username);
      isValidUsername = true;
    }

    let regex = new RegExp(/^(?=.{8,})/);

    if (emailValue === "") {
      setErrorFor(email, "Email cannot be blank");
      isValidEmail = false;
    } else if (!isEmail(emailValue)) {
      setErrorFor(email, "Not a valid email");
      isValidEmail = false;
    } else {
      setSuccessFor(email);
      isValidEmail = true;
    }

    if (passwordValue === "") {
      setErrorFor(password, "Password cannot be blank");
      isValidPwd = false;
    } else if (!regex.test(passwordValue)) {
      setErrorFor(password, "Atleast 1 caps,1 small letter,1 number & 8 char");
      isValidPwd = false;
    } else {
      setSuccessFor(password);
      isValidPwd = true;
    }

    if (confirm_passwordValue === "") {
      setErrorFor(confirm_password, "Confirm password cannot be blank");
      isValidConfirmPwd = false;
    } else if (passwordValue !== confirm_passwordValue) {
      setErrorFor(confirm_password, "Passwords does not match");
      isValidConfirmPwd = false;
    } else if (!regex.test(confirm_passwordValue)) {
      setErrorFor(
        confirm_password,
        "Atleast 1 caps,1 small letter,1 number & 8 char"
      );
      isValidConfirmPwd = false;
    } else {
      setSuccessFor(confirm_password);
      isValidConfirmPwd = true;
    }
    if (isValidUsername && isValidEmail && isValidPwd && isValidConfirmPwd) {
      checkEmailExists().then(isExists => !isExists && signup());
    }
  }

  function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  }
};

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  formControl.className = "form-group error";
  small.innerText = message;
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = "form-group success";
}

const signin = () => {
  const formData = {
    emailId: document.getElementById("signin_email").value,
    password: document.getElementById("signin_pwd").value
  };
  fetch("https://quick-poll-server.herokuapp.com/signin/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  })
    .then(res => res.json())
    .then(data => {
      const { username } = data;
      username && showToast(`Welcome ${username}`);
      //reset the contents of form
      username && resetFormData("signin-form");
    });
};

//https://quick-poll-server.herokuapp.com --prod
//http://localhost:5000 --local

//Arrow function called to create account after checking validations
const signup = () => {
  const formData = {
    name: document.getElementById("username").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
  };
  fetch("https://quick-poll-server.herokuapp.com/signup/createAccount", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  })
    .then(res => res.json())
    .then(data => {
      showToast(data.output);
      resetFormData("form");

      // Navigate to sign in tab
      onSignin();
    })
    .catch(err => showToast(err));
};

//https://quick-poll-server.herokuapp.com --prod
//http://localhost:5000 --local

//Check if the email is already registered to an account
const checkEmailExists = () => {
  return (
    document.getElementById("email").value &&
    fetch(
      `https://quick-poll-server.herokuapp.com/signup/checkEmail/${
        document.getElementById("email").value
      }`
    )
      .then(response => response.json())
      .then(data => {
        if (data.output === "Email already exists") {
          setErrorFor(email, data.output);
          return true;
        }
        return false;
      })
  );
};

const showToast = message => {
  Toastify({
    text: message,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "center",
    backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
    duration: 2000
  }).showToast();
};

const resetFormData = formid => {
  //reset the contents of form
  document.getElementById(formid).reset();
  // hide the success class element from the form inputs
  Array.prototype.forEach.call(
    document.getElementsByClassName("fas fa-check-circle"),
    function(el) {
      el.style.display = "none";
    }
  );

  // hide the success border for all form elements
  Array.prototype.forEach.call(
    document.getElementsByClassName("form-group"),
    function(el) {
      el.classList.remove("success");
    }
  );
};

const onCreatePoll = () => {
  window.location.href = "/choosepoll.html";
};

const onViewPolls = () => {
  window.location.href = "/viewpolls.html";
};

const onLogoClick = () => {
  window.location.href = "/";
};

const onLoginClick = () => {
  gsap.to("#contentContainer", 1, { y: 200, autoAlpha: 0 });
  gsap.from("#signinContainer", 1, {
    y: -200,
    duration: 2,
    autoAlpha: 1
  });
  document.getElementById("signinContainer").style.display = "block";
  onSignin();
};

const onSignin = () => {
  document.getElementById("signup-tab").style.display = "none";
  gsap.from("#signin-tab", 1, {
    duration: 0.5,
    z: -200,
    opacity: 0,
    scale: 0.5
  });
  document.getElementById("signin-tab").style.display = "block";

  document.querySelector(".nav-item a.active").classList.remove("active");
  document.getElementById("login").classList.add("active");
};

const onSignUp = () => {
  document.getElementById("signin-tab").style.display = "none";
  gsap.from("#signup-tab", 1, {
    duration: 0.2,
    z: -200,
    opacity: 0,
    scale: 0.5
  });
  document.getElementById("signup-tab").style.display = "block";

  document.querySelector(".nav-item a.active").classList.remove("active");
  document.getElementById("signup").classList.add("active");
};
