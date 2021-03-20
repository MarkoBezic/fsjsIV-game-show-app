/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

const phraseEl = document.querySelector("#phrase ul");

class Phrase {
  constructor(phrase) {
    this.phrase = phrase.toLowerCase();
  }

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

  checkLetter() {}

  showMatchedLetter() {}
}
