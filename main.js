// When the user starts the Farkle the bank and hand is set to 0 and all die are set to the 1 position
// click roll to begin
//      roll all six die
//      
//      if any die is clicked
//          mark it
//      if 1 or more die are clicked and hold is clicked
//          add appropriate score from clicked die to hand
//      if pass is clicked
//          add hand to bank
// 

// Header Button that starts roll and disappears

function startGame() {
    // Hide Start button after starting game for cleanliness
    var button = document.getElementById('startButton');
    if (button) {
        button.style.visibility = 'hidden';
    }

    let diceSet = [
        [1, false],
        [1, false],
        [1, false],
        [1, false],
        [1, false],
        [1, false],
    ];


    var alive = true;

    while(alive) {
        break;
    }
}

function rollDice() {

}

function holdDice() {

}

function passDice() {

}

function setDie(e) {

}