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
};

const onLogoClick = () => {
  window.location.href = "/";
};

const onLoginClick = () => {
  let tl = gsap.timeline({ paused: false });
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

  if (document.querySelector(".nav-item a.active") !== null) {
    document.querySelector(".nav-item a.active").classList.remove("active");
  }
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

  if (document.querySelector(".nav-item a.active") !== null) {
    document.querySelector(".nav-item a.active").classList.remove("active");
  }
  document.getElementById("signup").classList.add("active");
};
