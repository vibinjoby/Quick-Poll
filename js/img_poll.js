import { get } from "./http/http_manager.js";

let questionResponse;
let pollId;
let isResultFetched = false;

window.onload = function () {
  const url_str = location.href;
  var url = new URL(url_str);
  pollId = "5ef4e2ba831b620017435183"; //url.searchParams.get("pollId");

  getQuestion(pollId);
};

function getHeader() {
  const token = localStorage.getItem("token");
  let header = {
    "x-auth-token":
      "eyJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1ZWVkMGFiNTYzNGRkOTQ0MGZhZWFkNGMiLCJuYW1lIjoieWFkaHUiLCJlbWFpbCI6InlhZGh1ZWthbWJhcmFtMTk5MkBnbWFpbC5jb20iLCJfX3YiOjB9.LtXvmo8CZxfbgkgDr2eowx6ih-mhV-OvYlurUeaA2Rc",
  };

  return header;
}
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

  [1, 2, 3, 4].forEach(function (key) {
    if (optionJSON.hasOwnProperty(key)) {
      options =
        options +
        "<div class='option option-3 flex flex-vertical flex-gravity-center'>";
      options =
        options + '<img src="' + optionJSON[key] + '" class="option-img" />';
      options = options + '<div class="text_container">';
      options =
        options +
        '<div id="pb' +
        key +
        '" class="progress_bar flex flex-gravity-center">';
      options =
        options +
        '<label id="label_percentage' +
        key +
        '" class="font-lg proxima-light"></label>';
      options = options + "</div>";
      options =
        options +
        '<label id="label' +
        key +
        '" class="font-lg proxima-light option-text center">' +
        optionTexts[1] +
        "</label>";
      options = options + "</div>";
      options = options + "</div>";
    }
  });

  document.getElementById("option_container").innerHTML = options;
}

$(document).on("click", ".option", function (event) {
  if (isResultFetched) {
    return;
  }

  getResult();
});

function getResult() {
  get("/polls/viewResult/" + pollId, getHeader(), function (status, response) {
    if (status) {
      [1, 2, 3, 4].forEach(function (index) {
        if (response.hasOwnProperty(index)) {
          let value = response[index];
          console.log(index);
          console.log(value);
          document.getElementById("pb" + index).style.width = "100%";
          document.getElementById("label_percentage" + index).innerText =
            value + "%";
          document.getElementById("label" + index).style.display = "none";
        }
      });
      isResultFetched = true;
    } else {
      alert("Somethig went wrong");
    }
  });
}
