'use strict';

let currentScore = [0, 0];
let totalScore = [0, 0];

const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');
const btnReset = document.querySelector('.btn-reset');

const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');

function switchPlayer() {
  const player1Status = player1.classList.contains('active');

  if (player1Status) {
    player1.classList.remove('active');
    player2.classList.add('active');
  } else {
    player2.classList.remove('active');
    player1.classList.add('active');
  }
}

function changeTextContent(className, content) {
  document.querySelector(className).textContent = content;
}

btnRoll.addEventListener('click', rollDice);
function rollDice() {
  const rollValue = Math.ceil(Math.random() * 6);

  const dieImg = document.createElement('img');
  dieImg.classList.add('die-img');
  dieImg.src = `./img/dice-${rollValue}.png`;
  document.querySelector('main').appendChild(dieImg);

  const isPlayer1Active = player1.classList.contains('active');

  if (rollValue > 1) {
    isPlayer1Active
      ? (currentScore[0] += rollValue)
      : (currentScore[1] += rollValue);
    changeTextContent('.player1-current', currentScore[0]);
    changeTextContent('.player2-current', currentScore[1]);
  } else {
    isPlayer1Active ? (currentScore[0] = 0) : (currentScore[1] = 0);
    changeTextContent('.player1-current', currentScore[0]);
    changeTextContent('.player2-current', currentScore[1]);

    switchPlayer();
  }
}

btnHold.addEventListener('click', holdScore);
function holdScore() {
  const isPlayer1Active = player1.classList.contains('active');

  if (isPlayer1Active) {
    totalScore[0] += currentScore[0];
    changeTextContent('.player1-score', totalScore[0]);
    currentScore[0] = 0;
    changeTextContent('.player1-current', currentScore[0]);

    switchPlayer();
    if (totalScore[0] >= 100)
      changeTextContent('.player1-current', 'WINNER! 🏆');
  } else {
    totalScore[1] += currentScore[1];
    changeTextContent('.player2-score', totalScore[1]);
    currentScore[1] = 0;
    changeTextContent('.player2-current', currentScore[1]);

    switchPlayer();
    if (totalScore[1] >= 100)
      changeTextContent('.player2-current', 'WINNER! 🏆');
  }
}

btnReset.addEventListener('click', startNewGame);
function startNewGame() {
  currentScore = [0, 0];
  changeTextContent('.player1-current', currentScore[0]);
  changeTextContent('.player2-current', currentScore[1]);

  totalScore = [0, 0];
  changeTextContent('.player1-score', totalScore[0]);
  changeTextContent('.player2-score', totalScore[1]);

  const dieImg = document.querySelectorAll('.die-img');
  if (dieImg) dieImg.forEach(dieImg => dieImg.remove());

  switchPlayer();
}
