// Guess the word one letter at a time.
// Each player is only allowed to guess
// wrong three times.

// Prompt Player 1 to enter a word to guess and store
// as a variable.
//var word = prompt("Player 1, Enter your secret word.");
var word = "";

// Create a variable to store the number of bad guesses
var strikes = 0;

function execute() {
  strikes = 0;
  if(document.getElementById("secret-input").value.length > 0 && document.getElementById("proceed").innerHTML === "Press here to continue") {
    word = document.getElementById("secret-input").value;
    mainUI();
  }
}

// Fill this array with placeholders for guessing
function mainUI() {
  var fixedLabel = document.getElementById("fixed-label");
  fixedLabel.innerHTML = "";
  for (i = 0; i < word.length; i++) {
    fixedLabel.innerHTML += "_ ";
  }
  document.getElementById("secret-input").placeholder = "Player 2, Guess a letter.";
  document.getElementById("secret-input").value = "";
  document.getElementById("proceed").innerHTML = "Guess and press enter";
}

// Replaces a specific char in the string
String.prototype.replaceAt=function(index, char) {
  var a = this.split("");
  a[index] = char;
  return a.join("");
}

// Start a loop that continues as long as the person has
// not guessed wrong three times, or all of the letters have
// been guessed.
function player2UI(e) {
  var txt = document.getElementById("fixed-label").innerHTML;
  var code = e.keyCode ? e.keyCode : e.which;      //for firefox compatibility
  if(code == 13) {
    // && document.getElementById("proceed").innerHTML === "Guess and press enter"
    // Start a loop that continues as long as the person has
    // not guessed wrong three times, or all of the letters have
    // been guessed.
    if(strikes < 3 && txt.indexOf("_") >= 0) {

      // Prompt Player 2 to Player 2: Guess a letter and store as
      // a variable.
      var letter = document.getElementById("secret-input").value;

      // If the letter does not exist in the word,
      if (word.indexOf(letter) < 0 || letter.length != 1) {
        // add a strike
        strikes++;
        if(strikes == 3) {
          wrongGuess("Sorry, please play again!");
        } else {
          wrongGuess("Bad guess!");
        }
      // If the letter exists in the word, we need to
      // add it to the good guesses array
      } else {
        for (i = 0; i < word.length; i++) {
          // Each time the guess letter is found, we
          // add it as a good guess in the same spot
          if (word[i] === letter) {
            var label = document.getElementById("fixed-label");
            label.innerHTML= label.innerHTML.replaceAt(i*2, letter);
          }
        }
      }
      document.getElementById("secret-input").value = "";
      if(document.getElementById("fixed-label").innerHTML.indexOf("_") < 0) {
        showResult();
      }
    }
  }
}

// Once the player has exited the loop, congratulate
// them on a win, or tell them they have lost and show
// the secret word.
function showResult() {
  if(strikes < 3) {
    Congratulate();
  }
  else {
    wrongGuess("Sorry, please play again!");
  }
  setTimeout(resetMainUI, 6000);
}

function resetMainUI() {
    document.getElementById("fixed-label").innerHTML = "Secret word game";
    document.getElementById("secret-input").placeholder = "Player 1, Enter your secret word.";
    document.getElementById("secret-input").value = "";
    document.getElementById("proceed").innerHTML = "Press here to continue";
    document.getElementById("proceed").style.visibility = 'visible';
    document.getElementById("secret-input").style.visibility = 'visible';
    document.getElementById("proceed").style.marginTop = "75px";
  }

//Change UI to display an error based on the remaining number of trials

function wrongGuess(ErrorMessage) {
  var mainBlock = document.getElementById("main-content");
  var inputElement = document.getElementById("secret-input");
  var mainLabel = document.getElementById("fixed-label");
  var btn = document.getElementById("proceed");
  inputElement.innerHTML = "";
  if(strikes < 3) {
    inputElement.placeholder = ErrorMessage + "  " + (3-strikes) + " trials remaining";           //display remaining trials on the box for some seconds
    btn.innerHTML = "Bad guess!";
    setTimeout(resetPlayer2UI, 1500);
  } else {
      mainLabel.innerHTML = "Sorry, please play again!";
      inputElement.placeholder = ErrorMessage;
      btn.innerHTML = "Secret word was " + word;
      setTimeout(resetPlayer2UI, 6000);
  }
}

function resetPlayer2UI() {
  var mainBlock = document.getElementById("main-content");
  var inputElement = document.getElementById("secret-input");
  var btn = document.getElementById("proceed");
  if(strikes < 3) {
    inputElement.placeholder = "Player 2, Guess a letter.";
    btn.innerHTML = "Guess and press enter";
  }
  else {
    resetMainUI();
  }
}

//change UI to display congratulations
function Congratulate() {
  var mainBlock = document.getElementById("main-content");
  var labl =  document.getElementById("fixed-label");
  labl.innerHTML = "Congratulations!";
  document.getElementById("secret-input").style.visibility = 'hidden';          //hide box
  document.getElementById("proceed").style.marginTop = "35px";
  document.getElementById("proceed").innerHTML = "Secret word was \"" + word + "\"";
}
