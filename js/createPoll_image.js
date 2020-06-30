let noOfchoices = 0;
let noOfgridChoice = 0;
var isGrid = false;
const token = localStorage.getItem("token");
var question = document.getElementById("create_Question");
var isPrivateimg = false;
var optionlistimretgrid = [];
var optionlistimretlist = [];
//Function onload
window.onload = function () {
  document.getElementById("grid_layout").style.display = "none";
  hideLoadingPopup();
  add_choices(); //adding the first choice list
  add_choicesgrid(); //adding the first choice grid
  optionlistimretgrid = [];
  optionlistimretlist = [];
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
      '<input type="text" id="create_Choicelist' +
      noOfchoices +
      '" class="ChoiceOptionlist" placeholder="  Enter Answer choice "</input><img id ="Cancel_' +
      noOfchoices +
      '"  class= "delete_Choicelist"src="/assets/images/cancel.png" alt="Delete" >';

    table.appendChild(row);
    noOfchoices++;
  }
}

//Function to display the grid and list layout dependingly
function call_gridLayout() {
  isGrid = true;
  document.getElementById("grid_layout").style.display = "flex";
  document.getElementById("list_layout").style.display = "none";
  document.getElementById("gridLayout").src =
    "/assets/images/grid_selected.png";
  document.getElementById("listLayout").src =
    "/assets/images/list_unselected.png";
}
function call_listLayout() {
  isGrid = false;
  document.getElementById("grid_layout").style.display = "none";
  document.getElementById("list_layout").style.display = "block";
  document.getElementById("gridLayout").src =
    "/assets/images/grid_unselected.png";
  document.getElementById("listLayout").src =
    "/assets/images/list_selected.png";
}

//function to add multple choices (options) in grid
function add_choicesgrid() {
  if (noOfgridChoice > 3) {
    showToast("Maximum Number of Choice reached", true);
    console.log("Maximum number of grid choices reached");
  } else {
    var addat = "grid-item" + (noOfgridChoice + 1);
    var item = document.getElementById(addat);
    // document.getElementById(addat).insertAdjacentHTML("afterend", '<div class="grid-image"><img id ="gridupload" src="/assets/images/imageUpload.png" alt="Grid" ><label class= "uploadText" >Click to add image </label></div><input type="text" id="create_Choice" class="ChoiceOption" placeholder="  Enter Answer choice 0 ">');
    var add = (item.innerHTML =
      '<img id ="Cancel_' +
      (noOfgridChoice + 1) +
      '"  class= "delete_Choicegrid" src="/assets/images/cancel.png" alt="Delete" ><div id = "gridImg' +
      (noOfgridChoice + 1) +
      '" class="grid-image"><div id="imgload" class="image"><input type="file" id="selectImg' +
      (noOfgridChoice + 1) +
      '" style="display: none;"/> <img id ="upload" src="/assets/images/imageUpload.png" alt="Image Upload" ><label  id="id_' +
      (noOfgridChoice + 1) +
      '" class= "uploadText" >Click to add image </label></div></div><input type="text" id="create_Choicegrid ' +
      (noOfgridChoice + 1) +
      '" class="ChoiceOption" placeholder="  Enter Answer choice">');
    console.log(" created = gridImg" + (noOfgridChoice + 1));
    //document.getElementById(addat).appendChild(add);
    //var add = item.innerHTML = '<div id = '+"gridImg"+noOfgridChoice+' class="grid-image"><div id="imgload" class="image"><input id="selectImg" type="file" style="display: none;"/> <img id ="upload" src="/assets/images/imageUpload.png" alt="Image Upload" ><label  for="selectImg" class= "uploadText" >Click to add image </label></div></div><input type="text" id="create_Choice" class="ChoiceOption" placeholder="  Enter Answer choice '+noOfgridChoice+''">';
    noOfgridChoice++;
  }
}

var img;
var data;
let index = 0;
var imgset = [];

$(document).on("click", ".uploadText", function (event) {
  console.log(event);
  index = event.target.id.split("_")[1];
  $("#selectImg" + index).click();
});

$(document).on("change", "input[type='file']", function (event) {
  console.log(event);
  if (this.files && this.files[0]) {
    img = document.querySelector("#upload");
    img.src = URL.createObjectURL(this.files[0]);
    data = this.files[0];
    const files = event.target.files;
    //imgset.push(files[0]);
    imgset[index] = files[0];
    console.log(imgset.files + " ________________img set ________________");
    console.log(event);
    img.onload = imageIsLoaded;
  }
});

function imageIsLoaded() {
  if (isGrid) {
    var myDiv = document.getElementById("gridImg" + index);
    myDiv.innerHTML = `<img id ="uploadedImg${index}" class = "imageGrid" src="" alt="Image" >`;
    document.getElementById(`uploadedImg${index}`).src = img.src;
    index = 0;
  } else {
    var myDiv = document.getElementById("imgload");
    myDiv.innerHTML =
      '<img id ="uploadedImg" class=""uploadedList src="" alt="Image" >';
    document.getElementById("uploadedImg").src = this.src;
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

$(document).on("click", ".delete_Choicegrid", function (delevent) {
  //console.log(delevent.target.closest("div").id);
  console.log(delevent.target.closest("div").id);
  if (noOfgridChoice > 1) {
    document.getElementById(delevent.target.closest("div").id).style.display =
      "none";
    let id = delevent.target.closest("div").id;
    let position = parseInt(id.slice(-1)) - 1;
    console.log("------- position --------- " + position);
    imgset.slice(position, 1);
    optionlistimretgrid.slice(position, 1);
    noOfgridChoice--;
    console.log(
      "------- optionlistimretgrid --------------  " + optionlistimretgrid
    );
    console.log("------- imgset --------------  " + imgset);
  } else {
    showToast("Minimum Number of Choice reached", true);
  }
});

//Section on click create poll
$(document).on("click", ".btn-create", function (createPoll) {
  console.log(document.getElementById("create_Question").value + "printing");
  if (
    noOfchoices > 1 &&
    isGrid == false &&
    document.getElementById("create_Question").value
  ) {
    //list of more than 1 option
    let is_sucess = checkmandatorylist();
    if (is_sucess) {
      createlistPolls();
    } else {
      showToast("Please Enter all Mandatory feilds", true);
    }
  } else if (
    noOfgridChoice > 1 &&
    isGrid == true &&
    document.getElementById("create_Question").value
  ) {
    //grid of more than 1 option
    let is_sucess = checkmandatorygrid();
    if (is_sucess) {
      creategridPolls();
    } else {
      showToast("Please Enter all Mandatory feilds", true);
    }
  } else {
    showToast("Please Enter all Mandatory feilds", true);
  }
});

//var optionlistimretgrid = [];
function checkmandatorygrid() {
  for (let i = 1; i <= noOfgridChoice; i++) {
    console.log(
      imgset.length +
        "++++++++++++++++++++++++ length " +
        optionlistimretgrid.length
    );
    if (document.getElementById(`create_Choicegrid ${i}`).value) {
      optionlistimretgrid[i] = document.getElementById(
        `create_Choicegrid ${i}`
      ).value;
      //optionlistimretgrid.push(document.getElementById(`create_Choicegrid ${i}`).value);

      if (document.getElementById("is_PrivatePoll").checked == true) {
        isPrivate = true;
      } else {
        isPrivate = false;
      }
    } else if (imgset.length != optionlistimretgrid.length) {
      return false;
    } else {
      return false;
    }
  }
  console.log(
    imgset.length +
      "++++++++++++++++++++++++ length " +
      optionlistimretgrid.length
  );
  return true;
}
//var optionlistimretlist = [];
function checkmandatorylist() {
  for (i = 0; i < noOfchoices; i++) {
    if (document.getElementById(`create_Choicelist${i}`).value) {
      optionlistimretlist.push(
        document.getElementById(`create_Choicelist${i}`).value
      );
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

//For options
function creategridPolls() {
  console.log(imgset[0], optionlistimretgrid);
  showLoadingPopup();
  let formData = new FormData();
  formData.append("is_options_image", "Y");
  //:- TO-DO
  console.log(optionlistimretgrid);
  console.log(img);
  formData.append("is_private", isPrivate);
  //optionlistimretgrid.reverse();
  optionlistimretgrid = optionlistimretgrid.slice(1);
  formData.append("options_text", optionlistimretgrid.join());
  formData.append(
    "question_text",
    document.getElementById("create_Question").value
  );
  imgset.reverse();
  imgset.map((img) => formData.append("options", img));
  fetch(`https://quick-poll-server.herokuapp.com/create-polls/imagePoll`, {
    method: "POST",
    headers: {
      "x-auth-token": token,
    },
    body: formData,
  })
    .then((res) => {
      console.log(res);
      if (!res.ok) {
        throw new Error("HTTP Status" + res.status);
      }
      return res.text();
    })
    .then((data) => {
      console.log(data);
      showToast("Created Text poll successfully");
      hideLoadingPopup();
      window.location.href = "/mypolls.html";
    })
    .catch((err) => {
      console.log(err);
      hideLoadingPopup();
      showToast(err.message);
      //window.location.href = "/";
    });
}

function createlistPolls() {
  let formData = new FormData();
  formData.append("is_private", isPrivate);
  showLoadingPopup();
  //let formData = new FormData();
  formData.append("is_question_image", "Y");
  //:- TO-DO
  //console.log(optionlistimretgrid);
  //console.log(img);
  formData.append("options_text", optionlistimretlist.join());
  formData.append(
    "question_text",
    document.getElementById("create_Question").value
  );
  imgset.reverse();
  imgset.map((img) => formData.append("question", img));
  fetch(`https://quick-poll-server.herokuapp.com/create-polls/imagePoll`, {
    method: "POST",
    headers: {
      "x-auth-token": token,
    },
    body: formData,
  })
    .then((data, res) => {
      console.log(data);
      if (!data.ok) {
        throw new Error("HTTP Status" + res.status);
      }
      return data.text();
    })
    .then((data) => {
      console.log(data);
      showToast("Created Text poll successfully");
      hideLoadingPopup();
      window.location.href = "/mypolls.html";
    })
    .catch((err) => {
      console.log(err);
      hideLoadingPopup();
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
