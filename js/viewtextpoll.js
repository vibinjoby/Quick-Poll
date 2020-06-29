import { post, get } from "./http/http_manager.js";
import { getHeader } from "./utilities/util.js";

let pollId;
let isResult = 0;
window.onload = function () {
  showLoadingPopup();
  const token = localStorage.getItem("token");
  if (!token) window.location.href = "/";

  //Fetch the poll id from the url params
  const url_str = location.href;
  var url = new URL(url_str);
  pollId = url.searchParams.get("pollId");
  isResult = url.searchParams.get("result");

  //If no poll id passed redirect to view polls page
  !pollId ? (window.location.href = "/viewpolls.html") : "";
  fetch(
    `https://quick-poll-server.herokuapp.com/polls/getPollQuestion/${pollId}`,
    {
      headers: {
        "x-auth-token": token,
      },
    }
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error("HTTP Status" + res.status);
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      document.getElementById("question").innerHTML = data.question;
      [1, 2, 3, 4].forEach((element) => {
        data.options[`${element}`]
          ? (document.getElementById(`option-${element}`).innerHTML =
              data.options[`${element}`])
          : (document.getElementsByClassName("options")[
              element - 1
            ].style.display = "none");
      });
      hideLoadingPopup();
      animateOptions();

      if (isResult == 1) {
        getResult();
      }
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
  options.forEach((elem) => {
    tl.from(elem, {
      duration: 0.5,
      z: -200,
      opacity: 0,
      scale: 0.5,
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

function doVote(option) {
  let requestParam = {
    pollId: pollId,
    optionChosen: option,
  };

  post("/polls/vote", getHeader(), requestParam, function (status, response) {
    if (status) {
      getResult();
      console.log(response);
    } else {
      console.log(
        "-------- doVote ---- post --- else --- Something went wrong"
      );
    }
  });
}

function getResult() {
  get("/polls/viewResult/" + pollId, getHeader(), function (status, response) {
    if (status) {
      console.log(response);
      [1, 2, 3, 4].forEach(function (index) {
        if (response.hasOwnProperty(index)) {
          let value = response[index];

          document.getElementById("percentage_value_" + index).innerText =
            value + "%";
          document.getElementsByClassName("progressBar")[
            index - 1
          ].style.display = "flex";
          setTimeout(function () {
            document.getElementById("percentage_" + index).style.width =
              value + "%";
          }, 200);
          //document.getElementById("option-" + index).style.display = "none";
        }
      });
    } else {
      console.log(
        "------ getResult ---- get ---- else ---- Something went wrong"
      );
    }
  });
}

$(document).on("click", ".option", function (event) {
  // if (isResultFetched) {
  //   return;
  // }
  // isResultFetched = true;
  let id = event.target.id;
  let position = id.split("-")[1];
  doVote(position);
  // alert(position);
});
