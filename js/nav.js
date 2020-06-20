function onLogout() {
  localStorage.removeItem("token");
  window.location.href = "/";
}

const updateUsername = () => {
  const token = localStorage.getItem("token");
  var decoded = jwt_decode(token);
  const username = decoded.name.charAt(0).toUpperCase() + decoded.name.slice(1);
  document.getElementById("user-name").innerHTML = username;
};

updateUsername();
