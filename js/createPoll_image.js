let noOfchoices = 0;
let noOfgridChoice = 0;
var isGrid = false;
const token = localStorage.getItem("token");
var question = document.getElementById("create_Question");

//Function onload
window.onload = function () {
  document.getElementById("grid_layout").style.display = "none";
  hideLoadingPopup();
  add_choices(); //adding the first choice list
  add_choicesgrid(); //adding the first choice grid
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
      '<input type="text" id="create_Choice ' +
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
      '" class= "uploadText" >Click to add image </label></div></div><input type="text" id="create_Choice" class="ChoiceOption" placeholder="  Enter Answer choice">');
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
    imgset.push(files[0]);
    console.log(event);
    img.onload = imageIsLoaded;
  }
});

function imageIsLoaded() {
  if (isGrid) {
    var myDiv = document.getElementById("gridImg" + index);
    myDiv.innerHTML = `<img id ="uploadedImg${index}" class = "imageGrid" src="" alt="Image" >`;
    document.getElementById(`uploadedImg${index}`).src = img.src;
    showToast(img.src, true);
    index = 0;
  } else {
    var myDiv = document.getElementById("imgload");
    myDiv.innerHTML = '<img id ="uploadedImg" src="" alt="Image" >';
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
    noOfgridChoice--;
  } else {
    showToast("Minimum Number of Choice reached", true);
  }
});
//Section on click create poll
$(document).on("click", ".btn-create", function (createPoll) {
  console.log(document.getElementById("create_Question").text + "printing");
  if (noOfchoices > 1 && isGrid == false && question.text != "") {
    //list of more than 1 option
    showToast("Created List layout poll");
  } else if (noOfgridChoice > 1 && isGrid == true) {
    //grid of more than 1 option
    //checkformandatorygrid
    creategridPolls();

    showToast("Created grid layout poll");
  } else {
    showToast("Please Enter all Mandatory feilds", true);
  }
});

//For options
function creategridPolls() {
  let formData = new FormData();
  formData.append("is_options_image", "Y");
  //:- TO-DO
  formData.append("options_text", "1,2");
  formData.append("question_text", "Hi hiw are you");
  formData.append("is_private", true);

  imgset.map((img) => formData.append("options", img));
  fetch(`https://quick-poll-server.herokuapp.com/create-polls/imagePoll`, {
    method: "POST",
    headers: {
      "x-auth-token": token,
    },
    body: formData,
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("HTTP Status" + res.status);
      }
      return res.text();
    })
    .then((data) => {
      console.log(data);
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
  formData.append("is_question_image", "Y");
  ormData.append("is_private", isPrivate);
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

/*
$('input#selectImg').on('change', function () {
    var reader = new FileReader();
    reader.onload = function () {
        var thisImage = reader.result;
        localStorage.setItem("imgData", thisImage);
    };
    reader.readAsDataURL(this.files[0]);
    show();
});
function show(){
  var dataImage = localStorage.getItem('imgData');
  console.log(dataImage);
  var myDiv = document.getElementById("gridImg"+(i));
  myDiv.innerHTML = '<img id ="uploadedImg" src="" alt="Image" >';
  console.log(imgset[i],i);
  document.getElementById("uploadedImg").src = dataImage.src;
  var imgCtr = $('<img/>').prop('src', dataImage);
  $('div#imgContainer').append(imgCtr);
}
*/
