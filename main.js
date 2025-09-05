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

// dice board, die 1 is [0][0] for # and [0][1] to check if it is being held.
let diceSet = [
    [1, false],
    [1, false],
    [1, false],
    [1, false],
    [1, false],
    [1, false],
];

function startGame() {
    // Hide Start button after starting game for cleanliness
    var button = document.getElementById('startButton');
    if (button) {
        button.style.visibility = 'hidden';
    }

    setTimeout(showDice, 50);
}

function rollDice() {
    for (let i = 0; i < 6; i++) {
        if (!diceSet[i][1]) {
            diceSet[i][0] = getRandomInt(1, 6);

            var die = document.getElementById(i);
            die.textContent = (diceSet[i][0]).toString();
        }
    }
}

function passDice() {

}

function setDie(e) {
    var die = document.getElementById(e);
    if (die) {
        if (diceSet[Number(e)][1]) {
            die.style.backgroundColor = '#ffffffc9';
            diceSet[Number(e)][1] = false;
        }
        else {
            die.style.backgroundColor = '#ffffff5a';
            diceSet[Number(e)][1] = true;
        }
    }
}

function showDice() {
    var allDice = document.getElementById('diceSet');
    if (allDice) {
        allDice.style.visibility = 'visible';
    }
}

// From https://gist.github.com/kerimdzhanov/7529623
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}