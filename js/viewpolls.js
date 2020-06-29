window.onload = function() {
  const url_str = location.href;
  var url = new URL(url_str);
  let error = url.searchParams.get("error");
  if (error) showToast("Incorrect Join Poll link provided", "error");
  showLoadingPopup();
  const token = localStorage.getItem("token");
  if (!token) window.location.href = "/";

  fetch("https://quick-poll-server.herokuapp.com/polls/viewPublicPolls", {
    headers: {
      "x-auth-token": token
    }
  })
    .then(res => {
      if (!res.ok) {
        throw new Error("HTTP Status" + res.status);
      }
      return res.text();
    })
    .then(data => {
      document.getElementById("card-container").innerHTML = data;
      hideLoadingPopup();
      animateOptions();
    })
    .catch(() => {
      hideLoadingPopup();
      window.location.href = "/";
    });
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

const joinPoll = () => {
  const link = document.getElementById("pollLink").value;
  console.log("link", link);
  fetch(link)
    .then(res => {
      if (!res.ok) {
        showToast("Incorrect Join Poll link provided", "error");
      } else {
        window.location.href = link;
      }
    })
    .catch(() => showToast("Incorrect Join Poll link provided", "error"));
  if (!link) return;
};

const showToast = (message, error) => {
  Toastify({
    text: message,
    close: false,
    gravity: "top", // `top` or `bottom`
    position: "center",
    backgroundColor: !error
      ? "linear-gradient(to right, #00b09b, #96c93d)"
      : "linear-gradient(to right, #e01000, orange)",
    duration: 3000
  }).showToast();
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

const navigateToPoll = (pollId, navPage) => {
  if (navPage == 0) {
    window.location.href = `/showpoll.html?pollId=${pollId}`;
  } else if (navPage == 1) {
    window.location.href = `/option-text-poll.html?pollId=${pollId}`;
  } else {
    window.location.href = `/img_poll.html?pollId=${pollId}`;
  }
};
