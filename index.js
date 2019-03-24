const inquirer = require("inquirer");
const Word = require("./word");

//Music for every letter, and some get two
const options = ["Acapella", "Bluegrass", "Blues", "Country", "Disco", "Electronica", "Folk",
    "Grunge", "Hardcore", "Instrumental", "Jazz", "Karaoke", "Lullaby", "Mambo", "Minimalist",
    "Neoclassical", "Nordic", "Operetta", "Plainchant", "Progressive", "Quasidah", "Reggae",
    "Rockabilly", "Symphonic", "Tango", "Techno", "Underground", "Vaporwave", "Western",
    "Xylophone", "Yodeling", "Zamba"];
let current, goal, allowedFails;
let guesses = [];

const isValid = function (input) {
    //If guess isn't a letter
    if (input.length !== 1 || !input.match(/^[a-zA-Z]+$/)) {
        return "Please guess a letter";
    }
    //If they retry a letter
    for (let i = 0; i < guesses.length; i++) {
        if (input == guesses[i]) {
            return "That letter has already been tried";
        }
    }
    //Otherwise, it's valid
    return true;
}

const getGuess = function () {
    console.log(current.get());
    inquirer.prompt({
        name: "guess",
        validate: isValid
    }).then(function (input) {
        //Add the guess to the array guesses
        guesses.push(input.guess);
        //Do the guess, and see if it returns true
        if (current.guess(input.guess) === false) {
            allowedFails--;
            console.log("Too bad. Misses left: " + allowedFails);
        }
        //Check if the game is over. If not, continue.
        if (current.get() === goal) {
            gameOver(true);
        } else if (allowedFails < 0) {
            gameOver(false);
        } else {
            getGuess();
        }
    });
}

const gameOver = function (won) {
    //Give feedback on the game
    if (won) {
        console.log("Congratulations, you guessed the word!");
    } else {
        console.log("Too bad. The word was " + goal);
    }
    //Ask to play another
    inquirer.prompt({
        type: "confirm",
        name: "another",
        message: "Want to play again?"
    }).then(function (ans) {
        if (ans.another) {
            newGame();
        } else {
            console.log("Good playing with you!")
        }
    });
}

const newGame = function () {
    guesses = [];
    allowedFails = 6;
    goal = options[Math.floor(Math.random() * options.length)];
    current = new Word(goal);
    console.log("New game started");
    getGuess();
}

//Now all the functions have been made. It's time to play!
newGame();
