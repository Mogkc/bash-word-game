const Letter = require("./letter");

class Word {
    constructor(string) {
        this.letterArray = [];
        string = string.trim();
        for(let i = 0; i < string.length; i++) {
            this.letterArray.push(new Letter(string.charAt(i) ));
        }
    }
    get() {
        let toDisplay = "";
        this.letterArray.forEach(letter => {
            toDisplay += letter.get();
        });
        return toDisplay;
    }
    guess(char) {
        this.letterArray.forEach(letter => {
            letter.guess(char);
        });
    }
}

module.exports = Word;