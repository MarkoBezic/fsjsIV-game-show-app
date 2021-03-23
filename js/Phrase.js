/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

const phraseEl = document.querySelector("#phrase ul");

class Phrase {
  constructor(phrase) {
    this.phrase = phrase.toLowerCase();
  }

  //adds the phrase to the screen
  addPhraseToDisplay() {
    const splitPhrase = this.phrase.split("");
    let phraseHTML = "";
    splitPhrase.map((letter) => {
      if (letter !== " ") {
        phraseHTML += `<li class="hide letter ${letter}">${letter}</li>`;
      } else if (letter === " ") {
        phraseHTML += `<li class="hide space"> </li>`;
      }
    });
    phraseEl.innerHTML = phraseHTML;
  }

  // checks to see if selected letter is in the phrase and returns true or false
  checkLetter(letter) {
    return this.phrase.includes(letter);
  }

  // if the selected letter is in the phrase it reveals the letter on screen
  showMatchedLetter(letter) {
    for (let i = 0; i < phraseEl.children.length; i++) {
      if (phraseEl.children[i].innerHTML === letter) {
        phraseEl.children[i].classList.add("show");
        phraseEl.children[i].classList.remove("hide");
      }
    }
  }
}
