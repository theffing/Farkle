// Referenceable Variables ---------------------------------------------------

let roman = ['0', 'i', 'ii', 'iii', 'iv', 'v', 'vi'];

var startButton;
var rollButton;
var passButton;
var retryButton;
// The visual Set of Dice
var visualDiceSet;

var bankText;
var handText;

// die 1 is [0][0] for Num and [0][1] to check if Held.
let diceSet = [
        [1, false, false],
        [1, false, false],
        [1, false, false],
        [1, false, false],
        [1, false, false],
        [1, false, false],
    ];

let bank = 0;
let hand = 0;

let count = 0;
let dead = false;
let turn = false;
// preliminary bool to enforce proper use of setDie
let start = false;

// Button Functions-----------------------------------------------------------
function startGame() {
    startButton = document.getElementById('startButton');
    rollButton = document.getElementById('rollButton');
    rollButton.style.visibility = 'visible';
    passButton = document.getElementById('passButton');
    passButton.style.visibility = 'visible';
    retryButton = document.getElementById('retryButton');
    retryButton.style.visibility = 'hidden';
    // The visual Set of Dice
    visualDiceSet = document.getElementById('diceSet');
    
    bankText = document.getElementById('bank');
    handText = document.getElementById('hand');
    // Hide Start button after starting game for cleanliness
    startButton.style.visibility = 'hidden';

    resetDice();
    // reveals set of dice
    setTimeout(showDice, 50);
    dead = false;
    turn = true;
}

function rollDice() {
    start = true;
    calculateHand();
    // check if hold count is a successful six
    if (count == 6) {
        resetDice();
    }
    // check if at least one die is being held
    for (let i = 0; i < 6; i++) {
        if (diceSet[i][1] && !diceSet[i][2]) {
            diceSet[i][2] = true;
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
        turn = false;
        checkDie();
    }
}

function passDice() {
    if (turn) {
        calculateHand();
        turn = true;
        bank += hand;
        hand = 0;
        bankText.textContent = bank;
        handText.textContent = 0;
        startGame();
    }
}

function retry() {
    startGame();
    hand = 0;
    bank = 0;
    handText.textContent = hand;
    bankText.textContent = bank;
}

// Helper Functions ----------------------------------------------------------

// From https://gist.github.com/kerimdzhanov/7529623
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function setDie(e) {
    if (start) {
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
}

function calculateHand() {
    let sum = 0;
    for (let i = 0; i < 6; i++) {
        if (diceSet[i][0] == 1 && diceSet[i][1] && !diceSet[i][2]) {
            sum += 100;
        }
        if (diceSet[i][0] == 5 && diceSet[i][1] && !diceSet[i][2]) {
            sum += 50;
        }
    }
    sum += Number(handText.textContent);
    handText.textContent = sum;
}

function checkDie() {
    dice = [0, 0, 0, 0, 0, 0, 0];
    count = 0;
    //var debug = document.getElementById('debug');
    for (let i = 0; i < 6; i++) {
        if (!diceSet[i][1]) {
            dice[diceSet[i][0]] += 1;
        }
        else {
            count += 1;
        }
        //setTimeout(debugHelp(diceSet[i][0], dice[diceSet[i][0]]), 1000);
    }
    if (dice[1] > 0 || dice[2] > 2 || dice[3] > 2 || dice[4] > 2 || dice[5] > 0 || dice[6] > 2 || count == 6) {
        dead = false;
    }
    else { 
        died();
    }
}

function showDice() {
    visualDiceSet.style.visibility = 'visible';
}

function resetDice() {
    diceSet = [
        [1, false, false],
        [1, false, false],
        [1, false, false],
        [1, false, false],
        [1, false, false],
        [1, false, false],
    ];
    for (let i = 0; i < 6; i++) {
        var die = document.getElementById(i);
        die.textContent = '';
        die.style.backgroundColor = '#ffffffc9';
    }
    turn = true;
}

function died() {
    dead = true;
    turn = false;

    retryButton.style.visibility = 'visible';
    rollButton.style.visibility = 'hidden'; 
    passButton.style.visibility = 'hidden';
}