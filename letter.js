class Letter {
    constructor(oneLetter) {
        this.guessed = false;
        this.name = oneLetter;
    }
    get() { 
        return (this.guessed) ? this.name : "_";
    }
    guess(char) {
        if(char.toUpperCase() === this.name.toUpperCase()) {
            this.guessed = true;
        }
    }
}

module.exports = Letter;