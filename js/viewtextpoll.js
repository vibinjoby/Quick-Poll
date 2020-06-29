window.onload = function() {
  showLoadingPopup();
  const token = localStorage.getItem("token");
  if (!token) window.location.href = "/";

  //Fetch the poll id from the url params
  const url_str = location.href;
  var url = new URL(url_str);
  let pollId = url.searchParams.get("pollId");

  //If no poll id passed redirect to view polls page
  !pollId ? (window.location.href = "/viewpolls.html") : "";

  fetch(
    `https://quick-poll-server.herokuapp.com/polls/getPollQuestion/${pollId}`,
    {
      headers: {
        "x-auth-token": token
      }
    }
  )
    .then(res => {
      if (!res.ok) {
        throw new Error("HTTP Status" + res.status);
      }
      return res.json();
    })
    .then(data => {
      document.getElementById("question").innerHTML = data.question;
      [1, 2, 3, 4].forEach(element => {
        data.options[`${element}`]
          ? (document.getElementById(`option-${element}`).innerHTML =
              data.options[`${element}`])
          : (document.getElementsByClassName("options")[
              element - 1
            ].style.display = "none");
      });
      hideLoadingPopup();
      animateOptions();
    })
    .catch(() => {
      hideLoadingPopup();
      window.location.href = "/";
    });
};

const animateOptions = () => {
  var options = document.querySelectorAll(".options");
  var tl = gsap.timeline();
  tl.from(".poll-question-header", { duration: 2, x: 400, ease: "elastic" });
  options.forEach(elem => {
    tl.from(elem, {
      duration: 0.5,
      z: -200,
      opacity: 0,
      scale: 0.5
    });
  });
  tl.from(".footer-container", {
    duration: 2,
    z: -100,
    opacity: 0,
    scale: 0.5
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
