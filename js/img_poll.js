import { post, get } from "./http/http_manager.js";
import { getHeader } from "./utilities/util.js";

let questionResponse;
let pollId;
let isResultFetched = false;
let isResult = 0;

window.onload = function () {
  const url_str = location.href;
  console.log(url_str);
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
  let options = "";
  let optionJSON = questionResponse.options_img_urls;
  console.log(optionJSON);
  let optionText = questionResponse.options_text;
  console.log(optionText);
  let optionTexts = optionText.split(",");
  console.log(optionTexts);
  console.log("---------- " + isResult + " -------------");
  [1, 2, 3, 4].forEach(function (key) {
    if (optionJSON.hasOwnProperty(key)) {
      options =
        options +
        "<div class='option option-3 flex flex-vertical flex-gravity-center'>";
      options =
        options +
        '<img id="img_' +
        key +
        '" src="' +
        optionJSON[key] +
        '" class="option-img" />';
      options = options + '<div class="text_container flex flex-vertical">';
      options =
        options +
        '<label id="label_' +
        key +
        '" class="font-lg proxima-light option-text center">' +
        optionTexts[key - 1] +
        "</label>";
      options =
        options +
        '<div id="pb_' +
        key +
        '" class="progress_bar flex flex-gravity-center">';
      options =
        options +
        '<label id="label_percentage' +
        key +
        '" class="font-lg proxima-light"></label>';
      options = options + "</div>";

      options = options + "</div>";
      options = options + "</div>";
    }
  });

  document.getElementById("option_container").innerHTML = options;

  if (isResult == 1) {
    isResultFetched = true;
    getResult();
  }
}

$(document).on("click", ".option", function (event) {
  if (isResultFetched) {
    return;
  }
  isResultFetched = true;
  let id = event.target.id;
  let position = id.split("_")[1];
  doVote(position);
});

function doVote(option) {
  let requestParam = {
    pollId: pollId,
    optionChosen: option,
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
  get("/polls/viewResult/" + pollId, getHeader(), function (status, response) {
    if (status) {
      console.log(response);
      [1, 2, 3, 4].forEach(function (index) {
        if (response.hasOwnProperty(index)) {
          let value = response[index];
          document.getElementById("pb_" + index).style.width = value + "%";
          document.getElementById("label_percentage" + index).innerText =
            value + "%";
          //document.getElementById("label_" + index).style.display = "none";
        }
      });
    } else {
      console.log(
        "------ getResult ---- get ---- else ---- Something went wrong"
      );
    }
  });
}
