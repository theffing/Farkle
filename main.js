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
const startingDice = [
    [1, false, false],
    [1, false, false],
    [1, false, false],
    [1, false, false],
    [1, false, false],
    [1, false, false],
];

let diceSet = [
    [1, false, false],
    [1, false, false],
    [1, false, false],
    [1, false, false],
    [1, false, false],
    [1, false, false],
];

// Initial hand and bank totals
let bank = 0;
let hand = 0;

// Count of held dice | 
let count = 0;
let dead = false;
let turn = false;
// preliminary bool to enforce proper use of setDie
let start = false;

// Button Functions-----------------------------------------------------------
function startGame() {
    // Map all buttons - Start, Roll, Pass, and Retry
    var startButton = document.getElementById('startButton');
    var rollButton = document.getElementById('rollButton');
    var passButton = document.getElementById('passButton');
    var retryButton = document.getElementById('retryButton');
    // The visual Set of Dice
    var visualDiceSet = document.getElementById('diceSet');
    // Paragraph elements that contain hand and bank totals
    var bankText = document.getElementById('bank');
    var handText = document.getElementById('hand');
    // Show roll and pass buttons
    rollButton.style.visibility = 'visible';
    passButton.style.visibility = 'visible';
    // Hide start and retry buttons
    retryButton.style.visibility = 'hidden';
    startButton.style.visibility = 'hidden';
    // Set dice back to empty for first roll
    resetDice();
    // Show dice set
    setTimeout(showDice, 50);
    // Set user status to alive
    dead = false;
}

function rollDice() {
    // Game has started (used for setDie so users can't set starting dice)
    start = true;
    // Add sum of held dice to hand total
    addHand();
    // Check if hold count is a complete six
    if (count == 6) {
        resetDice();
    }
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
                die.textContent = (roman[diceSet[i][0]]);
            }
        }
        // This sets up the game loop
        turn = false;
        // Checks if your die are in a losing position, ie. no scoring dice
        checkDie();
    }
}

function passDice() {
    // If it is your turn and you are not dead
    if (turn && !dead) {
        // Add all newly held scoring dice to hand sum
        addHand();
        turn = true;
        bank += hand;
        hand = 0;
        bankText.textContent = bank;
        handText.textContent = "0";
        startGame();
    }
}

function retry() {
    startGame();
    start = false;
    hand = 0;
    bank = 0;
    bankText.textContent = "0";
    handText.textContent = "0";
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

function addHand() {
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
    //var debug = document.getElementById('debug');
    for (let i = 0; i < 6; i++) {
        if (!diceSet[i][1]) {
            dice[diceSet[i][0]] += 1;
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

// For the setTimeout Function in startGame()
function showDice() {
    visualDiceSet.style.visibility = 'visible';
}

function resetDice() {
    // reset set of dice to starting Dice
    diceSet = startingDice;
    // empty the visual board
    for (let i = 0; i < 6; i++) {
        var die = document.getElementById(i);
        die.textContent = '';
        die.style.backgroundColor = '#ffffffc9';
    }
    turn = true;
    start = false;
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