window.onload = function () {
  document.getElementById("img-poll").onclick = function () {
    console.log("here");
    window.location.href = "/createpoll-image.html";
  };
  document.getElementById("txt-poll").onclick = function () {
    window.location.href = "/createpoll-text.html";
  };
  gsap.from(".choose-poll-container > h1", {
    duration: 1,
    z: -200,
    opacity: 0,
    scale: 0.5,
  });

  gsap.from(".card-container", {
    duration: 1,
    z: -200,
    opacity: 0,
    scale: 0.5,
  });
};
