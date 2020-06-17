window.onload = () => {
  //hardcoded userid for testing will be removed later
  fetch(
    `https://quick-poll-server.herokuapp.com/polls/getMyPolls/5ee66f177bc74c9a33f0674a`
  )
    .then(res => res.text())
    .then(data => {
      document.getElementById("card-container").innerHTML = data;
      hideLoadingPopup();
    })
    .catch(err => hideLoadingPopup());
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
