/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
const startButton = document.querySelector("#btn__reset");
const qwertyEl = document.querySelector("#qwerty");
let game;

startButton.addEventListener("click", () => {
  game = new Game();
  game.resetGame();
  game.startGame();
});

qwertyEl.addEventListener("click", (e) => {
  if (e.target.classList.value === "key") {
    game.handleInteraction(e.target);
  }
});
