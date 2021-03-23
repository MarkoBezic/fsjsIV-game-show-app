/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
const startButton = document.querySelector("#btn__reset");
const qwertyEl = document.querySelector("#qwerty");
let game;

//Starts game buy clearing any previous game and loading a new one
startButton.addEventListener("click", () => {
  game = new Game();
  game.resetGame();
  game.startGame();
});

// listens for on screen keys being pressed and calls hadnleInteraction in the Game class
qwertyEl.addEventListener("click", (e) => {
  if (e.target.classList.value === "key") {
    game.handleInteraction(e.target.innerHTML);
  }
});

// listens for user keyboard input in and if letter has not already been selected calls the handle interactin function in the Game class
document.addEventListener("keydown", (e) => {
  let letter = e.code.slice(-1).toLowerCase();
  for (let i = 0; i < allKeys.length; i++) {
    if (allKeys[i].textContent === letter && allKeys[i].disabled === false) {
      if (game) {
        game.handleInteraction(letter);
      }
    }
  }
});
