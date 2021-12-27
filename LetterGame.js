var generateRandomNumber = null;

// Start
function Start() {

    difficultyLevel(true);

    document.querySelector('.start').hidden = true;
    document.querySelector('.stop').hidden = false;

    document.querySelector('input[name=input]').focus();

    var level = document.querySelector("input[name=level]:checked").value;
    var ranNum = randomNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26]);

    // Generate first number
    var number = ranNum.next().value;

    // Dec of left numbers
    document.querySelector('#score .left span').innerHTML = parseInt(document.querySelector('#score .left span').innerHTML) - 1;

    // Display current number
    document.querySelector('.target').innerText = number;

    // Listen to an input event function
    document.querySelector('input[name=input]').addEventListener("keydown", function (e) {
        // Get the corrected keyCode value
        var letterCode = e.keyCode - 64;

        // Check if the given number is equal to the input value
        if (number == letterCode) {
            document.querySelectorAll('.letter')[number - 1].classList.add('hit');
            document.querySelector('#score .hit span').innerHTML = parseInt(document.querySelector('#score .hit span').innerHTML) + 1;
        } else {
            document.querySelectorAll('.letter')[number - 1].classList.add('miss');
            document.querySelector('#score .miss span').innerHTML = parseInt(document.querySelector('#score .miss span').innerHTML) + 1;
        }

        // disable field after user input
        document.querySelector('input[name=input]').disabled = true;
        this.value = e.key;
    });

    // Set the interval
    generateRandomNumber = setInterval(function () {
        // if no input was made
        if (document.querySelector('input[name=input]').value == "") {
            document.querySelectorAll('.letter')[number - 1].classList.add('miss');
            document.querySelector('#score .miss span').innerHTML = parseInt(document.querySelector('#score .miss span').innerHTML) + 1;
        }

        // Clear the input
        document.querySelector('input[name=input]').value = "";
        document.querySelector('input[name=input]').disabled = false;
        document.querySelector('input[name=input]').focus();

        // Generate next number
        number = ranNum.next().value;

        // Stop the game if there are no numbers left
        if (number == undefined) {
            clearInterval(generateRandomNumber);
            StopGame();
            return 0;
        }

        // Display current number
        document.querySelector('.target').innerText = number;
        // Dec of left numbers
        document.querySelector('#score .left span').innerHTML = parseInt(document.querySelector('#score .left span').innerHTML) - 1;


    }, level);
}

// Stop
function Stop() {
    difficultyLevel(false);
    document.querySelector('.restart').hidden = false;
    document.querySelector('.stop').hidden = true;
    clearInterval(generateRandomNumber);
}

// Restart
function Restart() {
    document.querySelector('input[name=input]').value = "";
    document.querySelector('.target').innerText = "?";
    document.querySelector("#score .hit span").innerHTML = "0";
    document.querySelector("#score .miss span").innerHTML = "0";
    document.querySelector("#score .left span").innerHTML = "26";
    var allLetters = document.querySelectorAll('.letter');
    for (let i = 0; i < allLetters.length; i++) {
        allLetters[i].classList.remove('hit');
        allLetters[i].classList.remove('miss');
    }
    document.querySelector('.restart').hidden = true;
    document.querySelector('.start').hidden = false;
}

function difficultyLevel(cond) {
    var allLevels = document.querySelectorAll("input[name=level]");
    for (let i = 0; i < allLevels.length; i++)
        allLevels[i].disabled = cond;
}

// Random number from array elements
function* randomNumber(arr) {
    var i = arr.length;
    while (i--) {
        yield arr.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
    }
}