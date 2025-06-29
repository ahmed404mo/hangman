// The Sound Page
    // document.getElementById("pro").play();

// Letters 
const letters = "abcdefghijklmnopqrstuvwxyz";

// Get Array From Letters
let lettersArray = Array.from(letters);

// Select Letters Container 
let lettersContainer = document.querySelector(".letters");

// Generate Letters 
lettersArray.forEach(letter => {

    // Create Span
    let span = document.createElement('span');

    // Create Letter Text Node
    let theLetter = document.createTextNode(letter);

    // Append The Letter To Span 
    span.appendChild(theLetter);

    // Add Class On Span
    span.className = "letter-box";

    // Append Span To Letters Container 
    lettersContainer.appendChild(span);
});

// Object Of Words + Categories 
const Words = {
    programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
    movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
    people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
    countries: ["Syrai", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};

// Get Random Property

let allKeys = Object.keys(Words);

// Random Number Depend On Keys Length
let randomPropNumber = Math.floor(Math.random() * allKeys.length);

// Category
let randomPropName = allKeys[randomPropNumber];

// Category Words
let randomPropValue = Words[randomPropName];

// Random Number Depend On Words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

// The Chosen Word
let randomValueValue  = randomPropValue[randomValueNumber]

// Set Category Info 
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// Select Letters Guess Element
let letterGuessContainer = document.querySelector(".letters-guess");

// Convert Chosen Word To Array
let lettesAndSpace = Array.from(randomValueValue);


// Create Span Depend On Word
lettesAndSpace.forEach(letter => {
    
    // Create Empty Span
    let emptySpan = document.createElement("span");

    // If Letter Is Space
    if (letter === " ") {
        
        // Add Class To Span
        emptySpan.className = "with-space";
    }

    // Append Span To Letters Guess Container
    letterGuessContainer.appendChild(emptySpan);
});

// Select Guess Span 
let guessSpan = document.querySelectorAll(".letters-guess span");

// Set Wrong Attempts
let wrongAttempts = 0;

// Select The Drow Element
let theDraw = document.querySelector(".hangman-draw");

// Handle Clicking On Letters 
document.addEventListener("click", (e) => {

    // Set The Chose Status
    let theStatus = false;
    
    if (e.target.className === 'letter-box') {

        e.target.classList.add("clicked");

        // Get Clicked Letter
        let theClickedLetter = e.target.innerHTML.toLowerCase();

        // The Chosen Word
        let theChosenWord = Array.from(randomValueValue.toLowerCase());

        // console.log(theClickedLetter)

        theChosenWord.forEach((wordLetter, wordIndex) => {
            
            // If The Clicked Letter Equal To One Of The Chosen Word Letter
            if (theClickedLetter == wordLetter) {

                // Set Status To Correct
                theStatus = true;

                // Loop In All Guess Spans
                guessSpan.forEach((span, spanIndex) => {
                    
                    if (wordIndex === spanIndex) {

                        span.innerHTML = theClickedLetter;

                    }
                });

            }

        });
        // Outside Loop

        // If Letter Is Wrong
        if (theStatus !== true) {
            
            // Increas The Wrong Attempts
            wrongAttempts++;

            updateHealthBar();
            // Add Class Wrong On The Drow
            theDraw.classList.add(`wrong-${wrongAttempts}`);

            // Play Fail Sound
            document.getElementById("fail").play();
            
            if (wrongAttempts === 8) {
                endGame();
                let healthFill = document.querySelector(".health ");
                // Change Health Bar Width To 0
                healthFill.style.backgroundColor = "red";


                lettersContainer.classList.add("finished");

            }
            
        } else  {
    document.getElementById("success").play();

    // Check if player has won
    let allGuessed = true;
    guessSpan.forEach((span, index) => {
        if (span.innerHTML === "" && lettesAndSpace[index] !== " ") {
            allGuessed = false;
        }
    });

    if (allGuessed) {
        lettersContainer.classList.add("finished");
        winGame();
    }
}


    }
});

// End Game Function
function endGame() {
    
    // Create Popup Div
    let div = document.createElement("div");
    
    // Create Text Node
    let message = document.createElement("p");
    message.textContent = `Game Over, The Word Is: ${randomValueValue}`;
    div.appendChild(message);

    // Add Class On Div
    div.className = "popup";
    // Append Div To Body
    document.body.appendChild(div);
    
    let retryButton = document.createElement("button");
    retryButton.textContent = "Try Again";
    retryButton.className = "retry-button";

    retryButton.onclick = function () {
    window.location.reload();
    };
    div.appendChild(retryButton);
    // document.body.appendChild(div);
    
}
function winGame() {
    // Create Popup Div
    let div = document.createElement("div");

    // Create Text Node
    let message = document.createElement("p");
    message.textContent = `You Win! The Word Was: ${randomValueValue}`;
    div.appendChild(message);

    // Add Class On Div
    div.className = "popup";

    // Append Div To Body
    document.body.appendChild(div);

    // Create Retry Button
    let retryButton = document.createElement("button");
    retryButton.textContent = "Play Again";
    retryButton.className = "retry-button";

    retryButton.onclick = function () {
        window.location.reload();
    };
    div.appendChild(retryButton);

}



// Function to update health bar
function updateHealthBar() {
    let maxAttempts = 8;
    const healthFill = document.querySelector(".two");
    const healthPercentage = ((maxAttempts - wrongAttempts) / maxAttempts) * 100;

    healthFill.style.width = healthPercentage + "%";
}
// button to get a hint

let numberOfHints = 2;

document.querySelector(".hint span").innerHTML = numberOfHints;
const getHintButton = document.querySelector(".hint");


getHintButton.addEventListener("click", getHint);


function getHint() {
    if (numberOfHints > 0) {
        numberOfHints--;
        document.querySelector(".hint span").innerHTML = numberOfHints;


        if (numberOfHints === 0) {
            getHintButton.style.pointerEvents = "none";
            getHintButton.style.opacity = "0.5";
        }


        showRandomHintLetter();
    }
}


function showRandomHintLetter() {
    let theChosenWord = Array.from(randomValueValue.toLowerCase());
    let guessSpans = document.querySelectorAll(".letters-guess span");

    for (let i = 0; i < theChosenWord.length; i++) {
        if (guessSpans[i].innerHTML === "" && theChosenWord[i] !== " ") {
            guessSpans[i].innerHTML = theChosenWord[i];
            break; 
        }
    }
}



console.log(lettesAndSpace)