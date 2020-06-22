let noOfchoices=0;
//Function onload
window.onload = function() {
  add_choices()//adding the first choice list
  
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
 
  

