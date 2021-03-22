/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
const overlayEl = document.querySelector("#overlay");
const listOfHeartsEl = document.querySelectorAll(".tries");
const gameOverMessageEl = document.querySelector("#game-over-message");
const allKeys = document.querySelectorAll(".key");
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

  resetGame() {
    //reset previous game
    ////reset lives
    for (let i = 0; i < listOfHeartsEl.length; i++) {
      listOfHeartsEl[i].firstElementChild.setAttribute(
        "src",
        "images/liveHeart.png"
      );
    }
    this.missed = 0;
    ////clear li elements from phraseEl
    phraseEl.innerHTML = "";
    ////reset on screen keyboard
    for (let i = 0; i < allKeys.length; i++) {
      allKeys[i].classList.remove("chosen", "wrong");
      allKeys[i].disabled = false;
    }
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

  handleInteraction(button) {
    let selectedButton = "";
    for (let i = 0; i < allKeys.length; i++) {
      if (allKeys[i].innerText === button) {
        selectedButton = allKeys[i];
      }
    }
    selectedButton.disabled = true;
    let isCorrect = this.activePhrase.checkLetter(`${button}`);
    if (isCorrect) {
      this.activePhrase.showMatchedLetter(`${button}`);
      selectedButton.classList.add("chosen");
      if (this.checkForWin()) {
        this.gameOver();
      }
    } else if (!isCorrect) {
      selectedButton.classList.add("wrong");
      this.removeLife();
    }
  }

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
    let hiddenLetterArray = [];
    for (let i = 0; i < phraseEl.children.length; i++) {
      if (
        phraseEl.children[i].classList.value.includes("hide") &&
        phraseEl.children[i].classList.value.includes("letter")
      ) {
        hiddenLetterArray.push(phraseEl.children[i]);
      }
    }
    if (hiddenLetterArray.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  gameOver() {
    overlayEl.classList.remove("start");
    if (this.missed < 5) {
      overlayEl.classList.remove("lose");
      overlayEl.classList.add("win");
      overlayEl.style.display = "inherit";
      gameOverMessageEl.innerHTML = "YOU WIN!!!";
    } else if (this.missed === 5) {
      overlayEl.classList.remove("win");
      overlayEl.classList.add("lose");
      overlayEl.style.display = "inherit";
      gameOverMessageEl.innerHTML = "AWWW YOU LOST :(";
    }
  }
}
