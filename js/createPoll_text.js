let noOfchoices = 0;
var optionlist = [];
const token = localStorage.getItem("token");
var isPrivate = false;
//Function onload
window.onload = function () {
  hideLoadingPopup();
  add_choices(); //adding the first choice list
};

//function to add multple choices (options) in list
function add_choices() {
  if (noOfchoices > 3) {
    showToast("Maximum Number of Choice reached", true);
    console.log("Maximum number of list choices reached");
  } else {
    var table = document.getElementById("addChoice");
    var row = table.insertRow(noOfchoices);
    //var cell1 = row.insertCell(0);
    row.innerHTML =
      '<input type="text" id="create_Choice' +
      noOfchoices +
      '" class="ChoiceOptionlist" placeholder="  Enter Answer choice "</input><img id ="Cancel_' +
      noOfchoices +
      '"  class= "delete_Choicelist"src="/assets/images/cancel.png" alt="Delete" >';
    table.appendChild(row);
    noOfchoices++;
  }
}

$(document).on("click", ".delete_Choicelist", function (delevent) {
  if (noOfchoices > 1) {
    $(delevent.target).closest("tr").remove();
    noOfchoices--;
  } else {
    showToast("Minimum Number of Choice reached", true);
  }
});

//Section on click create poll
$(document).on("click", ".btn-create", function (createPoll) {
  if (noOfchoices > 1 && document.getElementById("create_Question").value) {
    //list of more than 1 option
    let is_sucess = checkmandatory();
    if (is_sucess) {
      createlistPolls();
      showToast("Created Text poll successfully");
    } else {
      showToast("Please Enter all Mandatory feilds", true);
    }
  } else {
    showToast("Please Enter all Mandatory feilds", true);
  }
});

function checkmandatory() {
  for (i = 0; i < noOfchoices; i++) {
    if (document.getElementById(`create_Choice${i}`).value) {
      optionlist.push(document.getElementById("create_Choice" + i).value);
      if (document.getElementById("is_PrivatePoll").checked == true) {
        isPrivate = true;
      } else {
        isPrivate = false;
      }
    } else {
      return false;
    }
  }
  return true;
}

function createlistPolls() {
  console.log("question", document.getElementById("create_Question").value);
  console.log(optionlist);
  console.log("isprivate", isPrivate);
  showLoadingPopup();
  fetch("https://quick-poll-server.herokuapp.com/create-polls/textPoll", {
    method: "POST",
    headers: {
      "x-auth-token": token,
    },
    body: {
      question: document.getElementById("create_Question").value,
      options: optionlist,
      is_private: isPrivate,
    },
  })
    .then((res) => {
      console.log(res);
      if (!res.ok) {
        throw new Error("HTTP Status" + res.status);
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      hideLoadingPopup();
      //navigate to my polls
    })
    .catch((err) => {
      console.log(err);
      hideLoadingPopup();
      showToast("Something went wrong");
      showToast(err.message);
      //window.location.href = "/";
    });
}

const showToast = (message, error) => {
  Toastify({
    text: message,
    close: false,
    gravity: "top", // `top` or `bottom`
    position: "center",
    backgroundColor: !error
      ? "linear-gradient(to right, #00b09b, #96c93d)"
      : "linear-gradient(to right,#e01000,orange)",
    duration: 3000,
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

const navigateToPoll = (pollId) => {
  window.location.href = `/showpoll.html?pollId=${pollId}`;
};
