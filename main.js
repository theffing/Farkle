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

let roman = ['0', 'i', 'ii', 'iii', 'iv', 'v', 'vi'];

// dice board, die 1 is [0][0] for # and [0][1] to check if it is being held.
let diceSet = [
    [1, false],
    [1, false],
    [1, false],
    [1, false],
    [1, false],
    [1, false],
];

let bank = 0;
let hand = 0;

let dead = false;
let turn = true;

function startGame() {
    // Hide Start button after starting game for cleanliness
    var button = document.getElementById('startButton');
    if (button) {
        button.style.visibility = 'hidden';
    }

    // reveals set of dice
    setTimeout(showDice, 50);
}

function rollDice() {
    // check if at least one die is being held
    for (let i = 0; i < 6; i++) {
        if (diceSet[i][1]) {
            turn = true;
        }
    }
    if (turn && !dead) {
        // roll each die unless it is being held
        for (let i = 0; i < 6; i++) {
            if (!diceSet[i][1]) {
                // rolling the individual die
                diceSet[i][0] = getRandomInt(1, 6);
                // making the visual die match the array
                var die = document.getElementById(i);
                die.textContent = (roman[diceSet[i][0]]);
            }
        }
        checkDie();
        turn = false;
    }
}

function passDice() {
    calculateHand();
    turn = true;
    bank += hand;
    hand = 0;
    var bankText = document.getElementById('bank');
    bankText.textContent = bank;
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
            calculateHand();
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

function calculateHand() {
    var hand = document.getElementById('hand');
    let sum = 0;
    for (let i = 0; i < 6; i++) {
        if (diceSet[i][1] && diceSet[i][1] == 1) {
            sum += 1;
        }
    }
    sum += Number(hand.textContent);
    hand.textContent = sum;
}

function checkDie() {
    dice = [];
    for (let i = 0; i < 6; i++) {
        if (diceSet)
        dice[diceSet[i][0]] += 1;
    }
    if (dice[1] > 0 || dice[2] > 2 || dice[3] > 2 || dice[4] > 2 || dice[5] > 0 || dice[6] > 2) {
        hand += 1000;
    }
}