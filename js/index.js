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
  const form = document.getElementById("form");
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirm_password = document.getElementById("confirm_password");

  const formHandler = e => {
    e.preventDefault();
    checkInputs();
  };

  form.addEventListener("submit", e => {
    formHandler(e);
    //Check for on input change only when the submit button is clicked once
    form.addEventListener("input", e => {
      formHandler(e);
    });
  });

  function checkInputs() {
    // trim to remove the whitespaces
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const confirm_passwordValue = confirm_password.value.trim();

    if (usernameValue === "") {
      setErrorFor(username, "Username cannot be blank");
    } else {
      setSuccessFor(username);
    }

    let regex = new RegExp("^(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.{8,})");

    if (emailValue === "") {
      setErrorFor(email, "Email cannot be blank");
    } else if (!isEmail(emailValue)) {
      setErrorFor(email, "Not a valid email");
    } else {
      setSuccessFor(email);
    }

    if (passwordValue === "") {
      setErrorFor(password, "Password cannot be blank");
    } else if (!regex.test(passwordValue)) {
      setErrorFor(password, "Atleast 1 caps,1 small letter,1 number & 8 char");
    } else {
      setSuccessFor(password);
    }

    if (confirm_passwordValue === "") {
      setErrorFor(confirm_password, "Confirm password cannot be blank");
    } else if (passwordValue !== confirm_passwordValue) {
      setErrorFor(confirm_password, "Passwords does not match");
    } else if (!regex.test(confirm_passwordValue)) {
      setErrorFor(
        confirm_password,
        "Atleast 1 caps,1 small letter,1 number & 8 char"
      );
    } else {
      setSuccessFor(confirm_password);
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

const signin = () => {};

const signup = () => {
  document.getElementById("email").value &&
    fetch(
      `https://quick-poll-server.herokuapp.com/checkEmail/${
        document.getElementById("email").value
      }`
    )
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.output === "Email already exists") {
          setErrorFor(email, data.output);
        }
      });
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
