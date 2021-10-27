"use strict";

// Selecting elemnts
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");

const newGameBtn = document.querySelector(".btn--new");
const rollDiceBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");

const players = document.querySelectorAll(".player");

// Initialzing variables
let randomNum, currentScore, scores, activePlayer, playing;

const init = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  setGameState();
  if (document.querySelector(".player--winner"))
    document
      .querySelector(".player--winner")
      .classList.remove("player--winner");
  players.forEach((player) => player.classList.remove("player--active"));
  players[activePlayer].classList.add("player--active");
  score0El.innerText = 0;
  score1El.innerText = 0;
  current0El.innerText = 0;
  current1El.innerText = 0;
  diceEl.classList.add("hidden");
};

// functions
const switchPlayer = () => {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).innerText = currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  players.forEach((player) => {
    player.classList.toggle("player--active");
  });
};

const setGameState = () => {
  if (!playing) {
    rollDiceBtn.disabled = true;
    holdBtn.disabled = true;
  } else {
    rollDiceBtn.disabled = false;
    holdBtn.disabled = false;
  }
};

rollDiceBtn.addEventListener("click", () => {
  // generate a random dice roll
  randomNum = Math.floor(Math.random() * 6) + 1;

  // Display the dice
  diceEl.classList.remove("hidden");
  diceEl.src = `./public/dice-${randomNum}.png`;

  // Check for the number 1
  if (randomNum != 1) {
    currentScore += randomNum;
    document.getElementById(`current--${activePlayer}`).innerText =
      currentScore;
  } else {
    scores[activePlayer] = 0;
    document.getElementById(`score--${activePlayer}`).innerText =
      scores[activePlayer];
    switchPlayer();
  }
});

holdBtn.addEventListener("click", () => {
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).innerText =
    scores[activePlayer];
  if (scores[activePlayer] >= 100) {
    // Finish the game
    playing = false;
    setGameState();
    diceEl.classList.add("hidden");
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("player--active");
  } else {
    switchPlayer();
  }
});

newGameBtn.addEventListener("click", init);

init();
