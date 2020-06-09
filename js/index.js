window.onload = function() {
  gsap.from(".pollBtn", { duration: 1, z: -200, opacity: 0, scale: 0.5 });
  gsap.from("#content", { duration: 1, z: -200, opacity: 0, scale: 0.5 });
  gsap.from("#logoLarge", {
    duration: 1,
    z: -200,
    opacity: 0,
    scale: 0.5
  });
};
