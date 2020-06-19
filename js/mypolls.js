window.onload = () => {
  //hardcoded userid for testing will be removed later
  fetch(
    `https://quick-poll-server.herokuapp.com/polls/getMyPolls/5ee66f177bc74c9a33f0674a`
  )
    .then(res => res.text())
    .then(data => {
      document.getElementById("card-container").innerHTML = data;
      hideLoadingPopup();
      animateOptions();
    })
    .catch(err => hideLoadingPopup());
};

const navigateToPoll = pollId => {
  window.location.href = `/showpoll.html?pollId=${pollId}`;
};

const animateOptions = () => {
  var options = document.querySelectorAll(".card");
  var tl = gsap.timeline();
  options.forEach(elem => {
    tl.from(elem, {
      duration: 0.2,
      z: -100,
      opacity: 0,
      scale: 0.5
    });
  });
};

/**
 * Loading popup functions
 */
const showLoadingPopup = () => {
  document.getElementById("loading-placeholder").style.display = "block";
};

const hideLoadingPopup = () => {
  document.getElementById("loading-placeholder").style.display = "none";
};
