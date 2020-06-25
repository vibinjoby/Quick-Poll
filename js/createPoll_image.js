let noOfchoices=0;
let noOfgridChoice=0;
var isGrid = false;
var imgset = [];
//Function onload
window.onload = function() {
  document.getElementById('grid_layout').style.display = 'none';
  add_choices()//adding the first choice list
  add_choicesgrid()//adding the first choice grid
};
//function to add multple choices (options)
function add_choices() {
  if (noOfchoices > 3){
alert("Maximum number of choices reached");
  }else{
    var table = document.getElementById("addChoice");
    var row = table.insertRow(noOfchoices);
    //var cell1 = row.insertCell(0);
    row.innerHTML = '<input type="text" id="create_Choice '+ noOfchoices +'" class="ChoiceOptionlist" placeholder="  Enter Answer choice "</input><img id ="Cancel_'+ noOfchoices +'"  class= "delete_Choicelist"src="/assets/images/cancel.png" alt="Delete" >';
    
    table.appendChild(row);
    noOfchoices++;
  }
}
  //Function to display the grid and list layout dependingly
  function call_gridLayout(){
    isGrid = true;
    document.getElementById('grid_layout').style.display = 'flex';
    document.getElementById('list_layout').style.display = 'none';
    document.getElementById("gridLayout").src = "/assets/images/grid_selected.png";
    document.getElementById("listLayout").src = "/assets/images/list_unselected.png";
  }
  function call_listLayout(){
    isGrid = false;
    document.getElementById('grid_layout').style.display = 'none';
    document.getElementById('list_layout').style.display = 'block';
    document.getElementById("gridLayout").src = "/assets/images/grid_unselected.png";
    document.getElementById("listLayout").src = "/assets/images/list_selected.png";

  }
  function add_choicesgrid() {
   
    if (noOfgridChoice > 3){
  alert("Maximum number of choices reached");
    }else{
      var addat = "grid-item"+(noOfgridChoice+1);
      var item = document.getElementById(addat);
      // document.getElementById(addat).insertAdjacentHTML("afterend", '<div class="grid-image"><img id ="gridupload" src="/assets/images/imageUpload.png" alt="Grid" ><label class= "uploadText" >Click to add image </label></div><input type="text" id="create_Choice" class="ChoiceOption" placeholder="  Enter Answer choice 0 ">'); 
      var add = item.innerHTML = '<div id = "gridImg'+(noOfgridChoice+1)+'" class="grid-image"><div id="imgload" class="image"><input id="selectImg" type="file" style="display: none;"/> <img id ="upload" src="/assets/images/imageUpload.png" alt="Image Upload" ><label  for="selectImg" class= "uploadText" >Click to add image </label></div></div><input type="text" id="create_Choice" class="ChoiceOption" placeholder="  Enter Answer choice">';
      console.log(" created = gridImg"+(noOfgridChoice+1));
      //document.getElementById(addat).appendChild(add);
      //      var add = item.innerHTML = '<div id = '+"gridImg"+noOfgridChoice+' class="grid-image"><div id="imgload" class="image"><input id="selectImg" type="file" style="display: none;"/> <img id ="upload" src="/assets/images/imageUpload.png" alt="Image Upload" ><label  for="selectImg" class= "uploadText" >Click to add image </label></div></div><input type="text" id="create_Choice" class="ChoiceOption" placeholder="  Enter Answer choice '+noOfgridChoice+''">';
 
      noOfgridChoice++;
    } 
      //var cell1 = row.insertCell(0)  
  }
  var img;
  var data;
  window.addEventListener('load', function() {
    document.querySelector('input[type="file"]').addEventListener('change', function() {
        if (this.files && this.files[0]) {
            img = document.querySelector('img');  
            img.src = URL.createObjectURL(this.files[0]);
            data= this.files[0]; 
            //imgset[noOfgridChoice] = img.src
            img.onload = imageIsLoaded;
        }
    });
  });
function imageIsLoaded() { 
if(isGrid){
  //var myDiv = document.getElementById("gridImg"+noOfgridChoice);
  console.log(" adding = gridImg"+(noOfgridChoice));

  imgset[noOfgridChoice] = img.src;
  for(i=1;i<=noOfgridChoice;i++){
    var myDiv = document.getElementById("gridImg"+(i));
    myDiv.innerHTML = '<img id ="uploadedImg" src="" alt="Image" >';
    console.log(imgset[i],i);
    document.getElementById("uploadedImg").src = img.src;
  }
}else{
  var myDiv = document.getElementById("imgload");
  myDiv.innerHTML = '<img id ="uploadedImg" src="" alt="Image" >';
  document.getElementById("uploadedImg").src = this.src;
} 
} 
$(document).on("click",".delete_Choicelist",function(delevent){
  $(delevent.target).closest("tr").remove();
  noOfchoices--;
});

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