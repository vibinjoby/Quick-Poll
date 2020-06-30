import { get, post } from "./http/http_manager.js";
import { getHeader } from "./utilities/util.js";

let questionResponse;
let pollId;
let isResult = 0;
let isResultShown = false;
let optionsText;

window.onload = function () {
  const url_str = location.href;
  var url = new URL(url_str);
  pollId = url.searchParams.get("pollId");
  isResult = url.searchParams.get("result");

  getQuestion(pollId);
};

function getQuestion(id) {
  get("/polls/getPollQuestion/" + id, getHeader(), function (status, response) {
    if (status) {
      console.log(response);
      questionResponse = response;
      updateView();
    } else {
      console.log("Something went wrong!");
    }
  });
}

function updateView() {
  let question = document.getElementById("que_holder");
  question.innerText = questionResponse.question_text;

  document.getElementById("img_question").src =
    questionResponse.question_img_url;
  let options = "";
  let indexes = [1, 2, 3, 4];
  optionsText = questionResponse.options_text;

  indexes.forEach(function (index) {
    if (optionsText.hasOwnProperty(index)) {
      options = options + '<div id="option_' + index + '" class="option flex">';
      options =
        options +
        '<label id="option-value_' +
        index +
        '" class="option-value font-lg proxima-light padding-vertical center">' +
        optionsText[index] +
        "</label>";
      options = options + "</div>";
    }
  });

  document.getElementById("option_container").innerHTML = options;
  document.getElementById("result-option-holder").innerHTML = options;

  if (isResult == 1) {
    getResult();
  }
}

$(document).on("click", ".option-value", function (event) {
  if (isResultShown) {
    return;
  }
  console.log(event.target.id);
  let optionChosen = event.target.id.split("_")[1];
  isResultShown = true;
  doVote(optionChosen);
});

function doVote(optionChoser) {
  let requestParam = {
    pollId: pollId,
    optionChosen: optionChoser,
  };

  post("/polls/vote", getHeader(), requestParam, function (status, response) {
    if (status) {
      getResult();
    } else {
      console.log(
        "-------- doVote ---- post --- else --- Something went wrong"
      );
    }
  });
}

function getResult() {
  console.log("----------- getResult ------------");
  get("/polls/viewResult/" + pollId, getHeader(), function (status, response) {
    if (status) {
      console.log(response);
      let result = "";
      let indexes = [1, 2, 3, 4];
      indexes.forEach(function (index) {
        if (response.hasOwnProperty(index)) {
          document.getElementById("option_" + index).style.backgroundColor =
            "white";
        }
      });

      indexes.forEach(function (index) {
        if (response.hasOwnProperty(index)) {
          let value = response[index];
          result = result + '<div class="option_result flex">';
          result = result + '<div class="result-holder flex">';
          result =
            result +
            '<div id="precentage_bg_' +
            index +
            '" class="progress_bg"></div>';
          result =
            result +
            '<label id="percantage_value_' +
            index +
            '" class="font-lg proxima-light padding-vertical margin-vertical-center">' +
            value +
            "%</label>";
          result = result + "</div>";
          result = result + "</div>";
        }
      });

      document.getElementById("option_container").innerHTML = result;
      document.getElementById("result-option-holder").style.display = "flex";

      setTimeout(function () {
        indexes.forEach(function (index) {
          if (response.hasOwnProperty(index)) {
            document.getElementById("precentage_bg_" + index).style.width =
              response[index] + "%";
          }
        });
      }, 200);
    } else {
      console.log(
        "------ getResult ---- get ---- else ---- Something went wrong"
      );
    }
  });
}
