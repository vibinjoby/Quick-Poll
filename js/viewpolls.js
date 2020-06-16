window.onload = function() {
  showLoadingPopup();
  fetch("https://quick-poll-server.herokuapp.com/polls/viewPublicPolls")
    .then(res => res.text())
    .then(data => {
      document.getElementById("card-container").innerHTML = data;
      hideLoadingPopup();
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
