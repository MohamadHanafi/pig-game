"use strict";

// Selecting elemnts
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");

const diceEl = document.querySelector(".dice");

// Starting position
score0El.innerText = 0;
score1El.innerText = 0;
diceEl.classList.add("hidden");
