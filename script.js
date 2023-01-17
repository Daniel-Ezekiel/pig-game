'use strict';

let currentScore = [0, 0];
let totalScore = [0, 0];

const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');
const btnReset = document.querySelector('.btn-reset');

const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');

btnRoll.addEventListener('click', rollDice);
function rollDice() {
  const rollValue = Math.ceil(Math.random() * 6);

  const dieImg = document.createElement('img');
  dieImg.classList.add('die-img');
  dieImg.src = `./img/dice-${rollValue}.png`;
  document.querySelector('main').appendChild(dieImg);

  if (player1.classList.contains('active') && rollValue > 1) {
    currentScore[0] += rollValue;
    document.querySelector('.player1-current').textContent = currentScore[0];
  } else if (player2.classList.contains('active') && rollValue > 1) {
    currentScore[1] += rollValue;
    document.querySelector('.player2-current').textContent = currentScore[1];
  } else if (player1.classList.contains('active') && !(rollValue > 1)) {
    currentScore[0] = 0;
    document.querySelector('.player1-current').textContent = currentScore[0];

    player1.classList.remove('active');
    player2.classList.add('active');
  } else {
    currentScore[1] = 0;
    document.querySelector('.player2-current').textContent = currentScore[1];

    player2.classList.remove('active');
    player1.classList.add('active');
  }
}

btnHold.addEventListener('click', holdScore);
function holdScore() {
  if (player1.classList.contains('active')) {
    totalScore[0] += currentScore[0];
    document.querySelector('.player1-score').textContent = totalScore[0];

    player1.classList.remove('active');
    player2.classList.add('active');

    currentScore[0] = 0;
    document.querySelector('.player1-current').textContent = currentScore[0];

    if (totalScore[0] >= 100)
      document.querySelector('.player1-current').textContent = 'WINNER! 🏆';
  } else {
    totalScore[1] += currentScore[1];
    document.querySelector('.player2-score').textContent = totalScore[1];

    player2.classList.remove('active');
    player1.classList.add('active');

    currentScore[1] = 0;
    document.querySelector('.player2-current').textContent = currentScore[1];

    if (totalScore[1] >= 100)
      document.querySelector('.player1-current').textContent = 'WINNER! 🏆';
  }
}

btnReset.addEventListener('click', startNewGame);
function startNewGame() {
  currentScore = [0, 0];
  totalScore = [0, 0];

  document.querySelector('.player1-current').textContent = currentScore[0];
  document.querySelector('.player2-current').textContent = currentScore[1];

  document.querySelector('.player1-score').textContent = totalScore[0];
  document.querySelector('.player2-score').textContent = totalScore[1];

  const dieImg = document.querySelectorAll('.die-img');
  if (dieImg) dieImg.forEach(dieImg => dieImg.remove());

  player1.classList.add('active');
  player2.classList.remove('active');
}
