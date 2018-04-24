// '"Game Function:
// player guesses number between the min and max 
// player gets a certain number of guesses 
// Notify player of guesses remaining
// Notify player of the right number if they lose
// let player choose to play again.

// Game values
let min = 1,
    max = 100,
    winningNum = getRandomNumber(min, max),
    guessesLeft = 7;

// UI Elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

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
guessBtn.addEventListener("click", function(){
    let guess = parseInt(guessInput.value);

     // Validate
     if(isNaN(guess) || guess < min || guess > max){
         setMessage(`Please enter a number between ${min} and ${max}`, 'red')
     } else if(guess === winningNum){
         gameOver(true, `${winningNum} is correct! YOU WIN!`)
     } else if(guess < winningNum) {
    // Game continues - wrong number
        guessesLeft -= 1;
        guessInput.value = '';
        guessInput.style.borderColor = 'red';
        setMessage(`${guess} is not correct. Guess Higher! You have ${guessesLeft} guesses left.`, `red`)
         } else {
            guessesLeft -= 1;
            guessInput.value = '';
            guessInput.style.borderColor = 'red';
            setMessage(`${guess} is not correct. Guess lower! You have ${guessesLeft} guesses left.`, `red`)
         }
        if(guessesLeft === 0){
            gameOver(false, `Game Over, you lost. The correct number was ${winningNum}.`)
        }
     }
);

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

