let noOfchoices=0;
let noOfgridChoice=0;
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
    row.innerHTML = '<input type="text" id="create_Choice" class="ChoiceOption form-control" placeholder="  Enter Answer choice '+ noOfchoices +' "</input>';
    
    table.appendChild(row);
    noOfchoices++;
  }
}
  //Function to display the grid and list layout dependingly
  function call_gridLayout(){
    document.getElementById('grid_layout').style.display = 'flex';
    document.getElementById('list_layout').style.display = 'none';
    document.getElementById("gridLayout").src = "/assets/images/grid_selected.png";
    document.getElementById("listLayout").src = "/assets/images/list_unselected.png";
  }
  function call_listLayout(){
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
      var add = item.innerHTML = '<div class="grid-image"><img id ="gridupload" src="/assets/images/imageUpload.png" alt="Grid" ><label class= "uploadText" >Click to add image </label></div><input type="text" id="create_Choice" class="ChoiceOption" placeholder="  Enter Answer choice 0 ">';
      //document.getElementById(addat).appendChild(add);
      noOfgridChoice++;
      console.log(noOfchoices+addat);
    } 
      //var cell1 = row.insertCell(0)  
  }

