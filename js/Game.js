/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
const overlayEl = document.querySelector("#overlay");
const listOfHeartsEl = document.querySelectorAll(".tries");
const gameOverMessageEl = document.querySelector("#game-over-message");
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

  removeLife() {
    this.missed++;
    for (let i = 0; i < this.missed; i++) {
      listOfHeartsEl[i].firstElementChild.setAttribute(
        "src",
        "images/lostHeart.png"
      );
    }
    if (this.missed == 5) {
      this.gameOver();
    }
  }

  checkForWin() {
    for (let i = 0; i < phraseEl.children.length; i++) {
      if (
        phraseEl.children[i].classList.value.includes("hide") &&
        !phraseEl.children[i].classList.value.includes("space")
      ) {
        return false;
      }
      return true;
    }
  }

  gameOver() {
    overlayEl.classList.remove("start");
    if (this.missed < 5) {
      overlayEl.classList.add("win");
      overlayEl.style.display = "inherit";
      gameOverMessageEl.innerHTML = "YOU WIN!!!";
    } else if (this.missed === 5) {
      overlayEl.classList.add("lose");
      overlayEl.style.display = "inherit";
      gameOverMessageEl.innerHTML = "AWWW YOU LOST :(";
    }
  }
}
