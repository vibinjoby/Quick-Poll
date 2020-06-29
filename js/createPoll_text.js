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
    row.innerHTML = '<input type="text" id="create_Choice '+ noOfchoices +'" class="ChoiceOption" placeholder="  Enter Answer choice "</input><img id ="Cancel_'+ noOfchoices +'"  class= "delete_Choice"src="/assets/images/cancel.png" alt="Delete" >'; 
    table.appendChild(row);
    noOfchoices++;
  }
}
$(document).on("click",".delete_Choice",function(delevent){
  $(delevent.target).closest("tr").remove();
  noOfchoices--;
});
$(document).on("click",".btn-create",function(createPoll){
  //$(createPoll.target).closest("tr").remove();
  
  showLoadingPopup();
});
/**
 * Loading popup functions
 */
const showLoadingPopup = () => {
  document.getElementById("loading-placeholder").style.display = "block";
};

const hideLoadingPopup = () => {
  document.getElementById("loading-placeholder").style.display = "none";
};

const navigateToPoll = pollId => {
  window.location.href = `/showpoll.html?pollId=${pollId}`;
};

 
  

