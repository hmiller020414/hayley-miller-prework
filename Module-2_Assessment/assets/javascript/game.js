let guessesMade = [];
let incorrectGuesses = [];
let gameStarted = false;
const wordBank = ["sydney opera house", "macchu picchu", "grand ole opry", "disneyland", "the big apple", "rubik's cube", "trampoline", "bungee cord", "air guitar", "jacuzzi", "not on my watch", "cat got your tongue", "later gator", "sick as a dog", "gone in a flash"];
let currentWord = "";
let currentSolution = [];
const startingGuesses = 5;
let guessesRemaining = startingGuesses;
let totalWins = 0;
let lastWord = "";
const freeLetters = ["r", "s", "t", "l", "n", "e"];

const stringifyPuzzle = function() {
    let displayString = "";
    for (let i=0; i<currentSolution.length; i++) {
        displayString += currentSolution[i] + " ";
        // Because .innerHtml doesn't recognize extra whitespace
        // We have to add an extra nbsp here to separate words
        if (currentSolution[i] === " "){
            displayString += "\u00A0"
        }
    }
    return displayString; 
}

const updateUI = function() {
    document.querySelector('#guesses-remaining').innerText=guessesRemaining;
    document.querySelector('#fillintheblank').innerText=stringifyPuzzle();
    document.querySelector('#incorrect-guesses').innerText=incorrectGuesses.join(" ");
    document.querySelector('#total-wins').innerText=totalWins;
}

const newWord = function() {
    lastWord = currentWord;
    while (currentWord === lastWord) {
        currentWord = wordBank[Math.floor(Math.random() * wordBank.length)];
    }
    for (let i=0; i<currentWord.length; i++) {
        if (currentWord[i] === " ") {
            currentSolution.push(" ");
        }
        else if (currentWord[i] === "'"){
            currentSolution.push("'");
        }
        else if (freeLetters.includes(currentWord[i])) {
            currentSolution.push(currentWord[i]);
        }
        else {
            currentSolution.push("_");
        }
    };
}

const resetGame = function() {
    incorrectGuesses = [];
    guessesMade = [...freeLetters];
    currentSolution = [];
    guessesRemaining = startingGuesses;
    newWord();
    updateUI();
}

const isCorrectGuess = function(key) {
    let correctGuess = false;
    for (let i=0; i<currentWord.length; i++) {
        const letter = currentWord[i];
        if (letter===key) {
            correctGuess = true;
            currentSolution[i]=letter;
        }
    }
    return correctGuess;
}

const keyPressed = function (event) {
    if (gameStarted) {
        const key = event.key;
        if (guessesMade.includes(key)) {
            alert('You have already guessed this letter!');
        }
        else if (key.toUpperCase()==key.toLowerCase() || key.length > 1) {
            alert('This word is only made up of letters! Try guessing one of those.');
        }
        else {
            guessesMade.push(key);

            let correctGuess = isCorrectGuess(key);

            if (correctGuess===false) {
                incorrectGuesses.push(key);
                guessesRemaining -= 1;
                if (guessesRemaining===0) {
                    currentSolution=currentWord.split().join(" ");
                    gameStarted=false;
                }
            }
            else if (currentSolution.join("")===currentWord) {
                totalWins += 1;
                gameStarted=false;
            }
            updateUI();
        }
    }
    else {
        gameStarted = true;
        resetGame();
    }
}

document.addEventListener('keyup', keyPressed);



