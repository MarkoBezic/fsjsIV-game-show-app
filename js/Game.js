/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
const overlayEl = document.querySelector("#overlay");

class Game {
  constructor() {
    this.missed = 0;
    this.phrases = this.createPhrases();
    this.activePhrase = null;
  }

  createPhrases() {
    let arrayOfPhrases = [];

    function createNewPhrases(array) {
      for (let i = 0; i < array.length; i++) {
        arrayOfPhrases.push(new Phrase(`${array[i]}`));
      }
    }

    createNewPhrases([
      "Eat my shorts",
      "You win some you lose some",
      "When pigs fly",
      "Early bird gets the worm",
      "Make like a tree and get out of here",
    ]);
    return arrayOfPhrases;
  }

  startGame() {
    overlayEl.style.display = "none";
    const phrase = this.getRandomPhrase();
    phrase.addPhraseToDisplay();
    this.activePhrase = phrase;
  }

  getRandomPhrase() {
    const randomNumber = Math.floor(Math.random() * Math.floor(5));
    return this.phrases[randomNumber];
  }

  handleInteraction() {}

  removeLife() {}

  checkForWin() {}

  gameOver() {}
}
