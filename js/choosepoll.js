window.onload = function () {
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
