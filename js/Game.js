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

  //Creates an array of 5 phrases
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

  //resets game back to initial states
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

  //Starts the game
  startGame() {
    overlayEl.style.display = "none";
    const phrase = this.getRandomPhrase();
    phrase.addPhraseToDisplay();
    this.activePhrase = phrase;
  }

  //Gets reandom phrase from the phrases array
  getRandomPhrase() {
    const randomNumber = Math.floor(Math.random() * Math.floor(5));
    return this.phrases[randomNumber];
  }

  //handles user interaction by checking if the use selectd the right letter and updating the game's state accordingly
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

  //removes a life from the game's scorecard
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

  //checks to see if user has won and returns true or false
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

  // ends the game and brings up the winning or losing screen
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
