//Varibles
var onOffButton = false; 
var start = false; 
var strict = false; 
var computerSequence = [];
var userSequence = [];
var level = 0;
var redSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var blueSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var yellowSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var greenSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
var sounds = [redSound, blueSound, yellowSound, greenSound];
var redButton = document.getElementById('red');
var blueButton = document.getElementById('blue');
var yellowButton = document.getElementById('yellow');
var greenButton = document.getElementById('green');
var buttons = [redButton, blueButton, yellowButton, greenButton];
var colors = ['red', 'blue', 'yellow', 'green'];

// Power Button.
// Clicking on the power button will enable you to click on the start and strict buttons.
$('#power').click(function() {
    onOffButton = (onOffButton === false);
    if (onOffButton) {
        $('#power').css('background-color', 'green');
        $('#power').css('color', 'black');
        $('#counterBox').text('--');
    } else {
        $('#power').css('background-color', 'black');
        $('#power').css('color', 'white');
        $('#start').css('background-color', 'black');
        $('#start').css('color', 'white');
        $('#strict').css('background-color', 'black');
        $('#strict').css('color', 'white');
        $('#counterBox').text('');
    };
    start = false;
    strict = false;
});

// Start Game Button.
// To start the game or resets the game to start a new game. 
$('#start').click(function() {
    if (onOffButton) {
        start = true;
        if (start) {
            $('#start').css('background-color', 'white');
            $('#start').css('color', 'black');
            $('#counterBox').text('1');
            reset();
        };
    };
});

// Reset.
// Reset function that is placed in the start function to reset the game.
function reset() {
    resetGame();
    startGame();
    playerTurn();
};

// Strict Game Button
// To play a strict game.
$('#strict').click(function() {
    strict = (strict === false);
    if (onOffButton && start) {
       strict = true;
       if (strict) {
        $('#strict').css('background-color', 'red');
        $('#strict').css('color', 'black');
       }
    } else {
       $('#strict').css('background-color', 'black');
       $('#strict').css('color', 'white');
    };
});

// Start game.
// Start to run the computerSequence at a random sequence.
function startGame(){
    console.log("Game starts")
    computerSequence.push(generateRandom())
    computerTurn();
};

// Reset game.
// resetGame will clear both Sequences and start the level at level 1.
function resetGame() {
    computerSequence = [];
    userSequence = [];
    level = 1;
};

// Generate a random color sequence every time the game starts
function generateRandom() {
    return Math.floor(Math.random() * 4) + 1;
};

// Computer turn.
// Loop through computersequence and for each number, play sound and light
function computerTurn() {
    var counter = 0;
    var interval = setInterval (function(){
        playWith(computerSequence[counter]);
        counter++;
        if (counter >= computerSequence.length) {
            clearInterval(interval);
        };
    },2000);
    console.log(`computerSequence ${computerSequence}`)
};

function playWith(number){
    buttons[number-1].classList.add('active')
    setTimeout (function() {
        sounds[number-1].play()
        buttons[number-1].classList.remove('active')
    },750);
};

function getNumberAttributes(number){
    var vali = [];
    switch (number) {
        case 1:
            vali = [sounds[0], buttons[0], colors[0]];
        case 2:
            vali =  [sounds[1], buttons[1], colors[1]];
        case 3:
            vali =  [sounds[2], buttons[2], colors[2]];
        case 4:
            vali =  [sounds[3], buttons[3], colors[3]];
    };
    return vali;
};

// Player turn.
// Click on highlighted color.
// When the highlighted is clicked to highlight the color.
// Play the sound of that color when clicked.
// Checks what buttons the player has clicked and moves to the next step.
function playerTurn() {
    buttons.forEach(function(button){
        button.addEventListener('click', function(event){
            let id = event.target.id;
            console.log(`ID clicked ${id}`)
            let number = colors.indexOf(id)
            let actualNumber = number + 1
            userSequence.push(actualNumber)
            playWith(actualNumber);
            check();
            console.log(`userSequence ${userSequence}`)
            nextStep();
        });
    }); 
};

// Next step.
// Compares the players length of the array to the computers length, if the same than adds another button to the sequence.
// Adds one level.
function nextStep() {
    if (userSequence.length == computerSequence.length){
        console.log('next')
        userSequence = [];
        next(); 
        level++;
    };
};

// Check function.
// To check if the right color was clicked.
// If right color was click move to next sequence.
// If wrong color was clicked start sequence over.
// If in strict mode when wrong color is clicked the game ends.
function check() {
    var promise = new Promise((resolve, reject) => {
        var userStage = userSequence.length-1
        if (userSequence[userStage] == computerSequence[userStage]){
            resolve ('Great ');
            setTimeout (function() {
                $('#counterBox').text(level);
                clearTimeout();
            },750);
            if (level == 5) {
                alert ('You Win!!');
                resetGame();
            };
            $('#counterBox').text('Yeah!');
        }else {
            reject ('Sucks ');
            $('#counterBox').text('Oops!');
            if (strict === true){
                alert('Game Over!');
                resetGame();
            };
            setTimeout (function() {
                $('#counterBox').text(level);
                clearTimeout();
            },750);
            computerTurn();       
        };
    });
    promise.then((message) => {
    }).catch((error) =>{
    });
};

// Next function
// To move the game process one step futher.
// Adding one more button press to the array.
function next(){
    computerSequence.push(generateRandom())
    computerTurn();        
};