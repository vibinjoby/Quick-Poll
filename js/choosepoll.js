window.onload = function() {
  this.gsap.from(".choose-poll-container > h1", {
    duration: 0.5,
    z: -200,
    opacity: 0,
    scale: 0.5
  });

  gsap.from(".card-container", {
    duration: 0.5,
    z: -200,
    opacity: 0,
    scale: 0.5
  });
};
