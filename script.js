const hangmanImage = document.querySelector(".hamgman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again")

let currentWord, correctLetters = [], wrongGuessCount = 0;
const maxGuesses = 6;

const resetGame = () => {
    // resetting game variables and ui elements
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = `hangman-${wrongGuessCount}.svg`;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    keyboardDiv.querySelector.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter></li>`).join("");
    gameModal.classList.remove("show");
}


const getRandomWord = () => {
        //selecting a random word and him from wordlist
    const { word, hint } =  wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
    wordDisplay.innerHTML = word.split("").map(() => `<li class-"letter"></li>`).join("");
}

const gameOver = (isVictory) => {
    //after 600ms of game complete.. showing modal with relevent details
    setTimeout(() => {
        const modalText = isVictory ? 'You found the word:' : 'the correct word was:';
        gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector("h4").innerText = `${isVictory ? 'Congrats!!' : 'Game Over!<3'}`;
        gameModal.querySelector("img").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show");
    }, 300)
}

const initGame = (button, clickedLetter) => {
        //checking if clickedletter is exist on the currentword
    if(currentWord.includes(clickedLetter)) {
        //showing all correct letters on the wprd display
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else{
        //if clicked letter doesnt exist then update the wrongGuessCount and hangman img
        wrongGuessCount++;
        hangmanImage.src = 'images/hangman-img-${wrongGuessCount}.svg';
    }

    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    //calling gameOver function if any of these condition meets
    if(wrongGuessCount === maxGuesses) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);
}

//creating keyboard buttons and adding event listeners
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromChatCode(i)));
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);