window.onload = function() {
  this.alert("am loaded");
  document.getElementById("logoContainer").onclick = onLogoClick;
};

const onLogoClick = () => {
  window.location.href = "/index.html";
};
