// '"Game Function:
// player guesses number between the min and max 
// player gets a certain number of guesses 
// Notify player of guesses remaining
// Notify player of the right number if they lose
// let player choose to play again

// Game values
let min = 1,
    max = 100,
    winningNum = getRandomNumber(min, max),
    guessesLeft = 7;

// Guess table constructor
function uiGuess(guess, guessesLeft, highOrLow, winningNum){
    this.guess = guess;
    this.guessesLeft = guessesLeft;
    this.highOrLow = highOrLow;
    this.winningNum = winningNum;
}

// UI constructor
function UI() {}

// Add guess to table
UI.prototype.addGuessToList = function(uiGuess){
    const list = document.getElementById('guess-list');
    // create row
    const row = document.createElement('tr');
    row.innerHTML=`
        <td>${uiGuess.guess}</tr>
        <td>${uiGuess.guessesLeft}</tr>
        <td>${uiGuess.highOrLow}</tr>
        <td>${uiGuess.winningNum}</tr>
    `;
    list.appendChild(row);
}

// UI Elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');
    uiGuessesLeft = document.querySelector('.number');

// Assign UI Min and Max
minNum.textContent = min;
maxNum.textContent = max;

// Listen for play again
game.addEventListener('mousedown', function (e) {
   if(e.target.className === 'play-again') {
       window.location.reload();
   }
})

// Listen for guess
guessBtn.addEventListener("click", function click(){
    let guess = parseInt(guessInput.value);

     // Validate
     if(isNaN(guess) || guess < min || guess > max){
         setMessage(`Please enter a number between ${min} and ${max}`, 'red')
     } else if(guess === winningNum){
         gameOver(true, `${winningNum} is correct! YOU WIN!`)
         setGuesses(` `, `black`)
         highOrLow = 'Nailed It!';
        logGuess(guess, guessesLeft, highOrLow, winningNum);
     } else if(guess < winningNum) {
    // Game continues - wrong number
        guessesLeft -= 1;
        let winningNum = '?';
        highOrLow = 'Higher';
        guessInput.value = '';
        guessInput.style.borderColor = 'red';
        setMessage(`${guess} is not correct. Guess Higher!`, `red`)
        setGuesses(`${guessesLeft}`, `black`)
        logGuess(guess, guessesLeft, highOrLow, winningNum);

         } else {
            guessesLeft -= 1;
            let winningNum = '?';
            highOrLow = 'Lower';
            guessInput.value = '';
            guessInput.style.borderColor = 'red';
            setMessage(`${guess} is not correct. Guess Lower!`, `red`)
            setGuesses(`${guessesLeft}`, `black`)
            logGuess(guess, guessesLeft, highOrLow, winningNum);

         }
        if(guessesLeft === 0){
            gameOver(false, `Game Over, you lost. The correct number was ${winningNum}.`)
        }
    }
);

guessInput.addEventListener("keypress", function(e){
    if(e.keyCode == 13){//Enter key pressed
        guessBtn.click();//Trigger search button click event
    }
});

// Game over
function gameOver(won, msg){
    let color;
    won === true ? color = 'green' : color = 'red';
    guessInput.disabled = true;
    guessInput.style.borderColor = color;
    message.style.color = color;
    setMessage(msg);

    // play again?
    guessBtn.value= 'Play Again';
    guessBtn.className += 'play-again';
}

// Get Winning Number
function getRandomNumber(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}


// Set message
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}

// Set guesses left
function setGuesses(msg, color){
    uiGuessesLeft.style.color = color;
    uiGuessesLeft.textContent = msg;
}

// Add guesses to chart
function logGuess(guess, guessesLeft, highOrLow, winningNum){
    // New guess
    const newGuess = new uiGuess(guess, guessesLeft, highOrLow, winningNum);

    // UI Object
    const ui = new UI();
    // add guess to list
    ui.addGuessToList(newGuess);
}
