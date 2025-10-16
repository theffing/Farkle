// Referenceable Variables ---------------------------------------------------

// for easy conversion from number to numeral
const roman = ['0', 'i', 'ii', 'iii', 'iv', 'v', 'vi'];

// Map all buttons - Start, Roll, Pass, and Retry
var startButton;
var rollButton;
var passButton;
var retryButton;
// The visual Set of Dice
var visualDiceSet;
// Paragraph elements that contain hand and bank totals
var bankText;
var handText;

// Dice Set - die 1 is [0][0] for Num and [0][1] to check if Held.
let diceSet = [
    [1, false, false],
    [1, false, false],
    [1, false, false],
    [1, false, false],
    [1, false, false],
    [1, false, false],
];

let baseDiceSet = [
    [1, false, false],
    [1, false, false],
    [1, false, false],
    [1, false, false],
    [1, false, false],
    [1, false, false],
];

let baseDiceCount = {"1":0, "2":0, "3":0, "4":0, "5":0, "6":0};
let dice = {};

// Initial hand and bank totals
let bank = 0;
let hand = 0;

let dead = false;
let turn = true;
// preliminary bool to enforce proper use of setDie
let start = false;

// Button Functions-----------------------------------------------------------
function startGame() {
    // Map all visuals
    startButton = document.getElementById('startButton');
    rollButton = document.getElementById('rollButton');
    passButton = document.getElementById('passButton');
    retryButton = document.getElementById('retryButton');
    visualDiceSet = document.getElementById('diceSet');
    bankText = document.getElementById('bank');
    handText = document.getElementById('hand');
    // Hide start and retry buttons
    retryButton.style.visibility = 'hidden';
    startButton.style.visibility = 'hidden';
    // Show roll and pass buttons
    rollButton.style.visibility = 'visible';
    passButton.style.visibility = 'visible';
    // Set dice back to empty for first roll
    resetDice();
    // Show dice set
    setTimeout(showDice, 50);
    // Reset Hand and Adjust Bank
    hand = 0;
    bank += hand;
    bankText.textContent = bank;
    handText.textContent = hand;
    // Set user status to alive
    dead = false;
    start = false;
}

function rollDice() {
    if (start) {
        // Add sum of held dice to hand total
        addHand();
    }
    // Game has started (used for setDie so users can't set starting dice)
    start = true;
    // Check if at least one die is being held
    for (let i = 0; i < 6; i++) {
        // Checking if held and if it has already been accounted for in a previous roll/pass via addHand()
        if (diceSet[i][1] && !diceSet[i][2]) {
            diceSet[i][2] = true;
            turn = true;
        }
    }
    if (turn && !dead) {
        // Roll every unheld die
        for (let i = 0; i < 6; i++) {
            if (!diceSet[i][1]) {
                // Get Random Int 1-6 and set diceSet value to it
                diceSet[i][0] = getRandomInt(1, 6);
                // Edit visual Die to match 
                var die = document.getElementById(i);
                die.textContent = roman[diceSet[i][0]];
            }
        }
        // This sets up the game loop
        turn = false;
    }
}

function passDice() {
    addHand();
    let hand = Number(handText.textContent);
    handText.textContent = 1;
    startGame();
}

// Helper Functions ----------------------------------------------------------

function setDie(e) {
    if (start) {
        var die = document.getElementById(e);
        if (die) {
            if (diceSet[Number(e)][1] && !diceSet[Number(e)][2]) {
                die.style.backgroundColor = '#ffffffc9';
                diceSet[Number(e)][1] = false;
                count -= 1;
            }
            else {
                die.style.backgroundColor = '#ffffff5a';
                diceSet[Number(e)][1] = true;
                count += 1;
            }
        }
    }
}

// Adds held die total to hand
function addHand() {
    let sum = 0;
    // Get count of each number rolled plus check if dead
    checkDie();
    // 1 = 100, 5 = 50
    // three of a kind is worth 100 * the given number; 4 4 4 is worth 400 points
    // three 1 is worth 1000
    // four or more of a kind is worth double th epoints of three of a kind
    // 4 4 4 4 is worth 800 : 4 4 4 4 4 is worth 1600
    for (let i = 1; i < 7; i++) {
        let num = 0;
        if (i == 1 && dice[i] > 0) {
            if (dice[i] > 2) {
                num += 1000;
            }
            else {
                num += dice[i] * 100;
            }
        }
        if (i == 5 && dice[i] > 0) {
            if (dice[i] < 2) {
                num += dice[i] * 50;
            }
        }
        if (dice[i] > 2 && i != 1) {
            num += (i+1) * 100;
        }
        if (dice[i] > 3) {
            num = num * 2;
        }
        if (dice[i] > 4) {
            num = num * 2;
        }
        if (dice[i] > 5) {
            num = num * 2;
        }
        sum += num;
    }
    // HOld on
    handText.textContent = hand + sum;
    hand += sum;
}

// Checks if you are in a losing position, ie. No scoring dice
function checkDie() {
    dice = baseDiceCount;
    for (let i = 0; i < 6; i++) {
        if (diceSet[i][1] && !diceSet[i][2]) {
            diceSet[i][2] = true;
            dice[i] += 1;
        }
    }
    if (dice["0"] < 1 && dice["1"] < 3 && dice["2"] < 3 && dice["3"] < 3 && dice["4"] < 1 && dice["5"] < 3 && count < 6) {
        died();
    }
}

function died() {
    // Dead - until startGame() is called by retry()
    dead = true;
    turn = false;
    // Show retry button and hide all remaining visible buttons - Roll & Pass
    retryButton.style.visibility = 'visible';
    rollButton.style.visibility = 'hidden'; 
    passButton.style.visibility = 'hidden';
}

function resetDice() {
    // reset set of dice to starting Dice
    diceSet = baseDiceSet;
    // empty the visual board
    for (let i = 0; i < 6; i++) {
        var die = document.getElementById(i);
        die.textContent = '';
        die.style.backgroundColor = '#ffffffc9';
    }
}

// From https://gist.github.com/kerimdzhanov/7529623
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// For the setTimeout Function in startGame()
function showDice() {
    visualDiceSet.style.visibility = 'visible';
}