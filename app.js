let gameSeq = [];
// An empty array to store the sequence of colors generated by the game.

let userSeq = [];
// An empty array to store the sequence of colors input by the user.

let btns = [ "yellow", "red", "purple", "green" ];
// An array that holds the possible button colors in the game.

let started = false;
// A boolean flag to track whether the game has started or not.

let level = 0;
// A variable to keep track of the current level of the game.

let highestScore = 0;
// A variable to keep track of the highest score the user has achieved.

let h2 = document.querySelector("h2");
// Selects the <h2> element from the HTML document, which is used to display the current level and game status.

document.addEventListener("keypress", function(){
    if (started == false) {
        // If the game has not started yet (started is false), this block runs.
        console.log("game is started");
        // Logs a message to the console indicating that the game has started.

        started = true;
        // Set the 'started' flag to true, marking the game as active.

        levelUp();
        // Calls the 'levelUp' function to begin the first level of the game.
    }
});
// Adds an event listener to the entire document that listens for any keypress. When a key is pressed, it starts the game if it hasn't started yet.

function gameFlash(btn) {
   btn.classList.add("flash");
   // Adds the CSS class 'flash' to the button element to trigger a visual flash effect.

   setTimeout( function () {
    btn.classList.remove("flash");
   },300);
   // After 300 milliseconds, removes the 'flash' class from the button, ending the flash effect.
}
// A function to visually indicate the game's button flash animation.

function userFlash(btn) {
    btn.classList.add("userflash");
    // Adds the CSS class 'userflash' to the button, indicating that the user has clicked it.

    setTimeout( function () {
     btn.classList.remove("userflash");
    },300);
    // After 300 milliseconds, removes the 'userflash' class, ending the user's button press effect.
}
// A function to visually indicate the user's button press.

function levelUp(){
    userSeq = [];
    // Clears the user's sequence for the new level.

    level++;
    // Increments the game level by 1.

    h2.innerText = `Level ${level}`;
    // Updates the <h2> element to display the current level.

    let randIdx = Math.floor(Math.random() * 3);
    // Generates a random index between 0 and 3 to select a color from the 'btns' array.

    let randColor = btns[randIdx];
    // Retrieves a random color from the 'btns' array using the random index.

    let randBtn = document.querySelector(`.${randColor}`);
    // Selects the button element with the randomly chosen color.

    gameSeq.push(randColor);
    // Adds the randomly selected color to the 'gameSeq' array, building the game's sequence.

    console.log(gameSeq);
    // Logs the current game sequence to the console for debugging purposes.

    gameFlash(randBtn);
    // Calls the 'gameFlash' function to flash the randomly selected button.
}
// A function to advance to the next level, add a random color to the game sequence, and display it.

function checkAns(idx){
   if(userSeq[idx] === gameSeq[idx]){
    // Compares the user's input at index 'idx' to the corresponding value in the game's sequence.
    
    if(userSeq.length == gameSeq.length){
        // If the user's sequence matches the game's sequence in both length and content, they have successfully completed the level.
        setTimeout(levelUp,1000);
        // After 1 second (1000 milliseconds), call the 'levelUp' function to proceed to the next level.
    }
   }else {
    // If the user's input does not match the game's sequence at the given index, the game is over.
    
     if (level > highestScore) {
        highestScore = level;
        // If the current level is higher than the highest score, update the highest score.
     }

    h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Highest Score: <b>${highestScore}</b> <br> Press any key to start.`;
    // Updates the <h2> element to display the "Game Over" message, the user's score, and the highest score.

    document.querySelector("body").style.backgroundColor = "red";
    // Changes the background color of the body to red to visually indicate a mistake.

    setTimeout(function() {
        document.querySelector("body").style.backgroundColor = "white";
    },150);
    // After 150 milliseconds, changes the background color back to white.

    reset();
    // Calls the 'reset' function to reset the game.
   }
}
// A function that checks if the user's input matches the game's sequence. If correct, it advances to the next level, otherwise, it ends the game.

function btnPress() {
    let btn = this;
    // Refers to the button that triggered the event listener (i.e., the button clicked by the user).

    userFlash(btn);
    // Calls the 'userFlash' function to visually indicate the user's button press.

    let userColor = btn.getAttribute("id");
    // Retrieves the 'id' attribute of the clicked button, which is the color name.

    userSeq.push(userColor);
    // Adds the clicked button's color to the user's sequence.

    checkAns(userSeq.length-1);
    // Calls the 'checkAns' function, passing the last index of the user's sequence, to check if their input is correct.
}
// A function that handles button clicks by the user, flashes the button, adds the button's color to the user's sequence, and checks the answer.

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}
// Selects all elements with the class 'btn' (the colored buttons) and attaches a 'click' event listener to each of them. When clicked, it triggers the 'btnPress' function.

function reset() {
    started = false;
    // Resets the 'started' flag to false, allowing the game to be restarted.

    gameSeq = [];
    // Clears the game's sequence array.

    userSeq = [];
    // Clears the user's sequence array.

    level = 0;
    // Resets the level to 0, effectively restarting the game.
}
// A function to reset the game state after a game over.
