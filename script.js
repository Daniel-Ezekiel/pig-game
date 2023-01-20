'use strict';

const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');
const btnReset = document.querySelector('.btn-reset');

const dieImg = document.querySelector('.die-img');

const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');

let playing, currentScore, totalScore;
function init() {
  playing = true;
  currentScore = [0, 0];
  totalScore = [0, 0];

  changeTextContent('.player1-current', currentScore[0]);
  changeTextContent('.player1-score', totalScore[0]);
  changeTextContent('.player2-current', currentScore[1]);
  changeTextContent('.player2-score', totalScore[1]);

  dieImg.classList.add('hidden');

  if (!player1.classList.contains('active')) switchPlayer();
}
init();

function switchPlayer() {
  if (player1.classList.contains('active')) {
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
function checkWinner(score, player) {
  if (score >= 20) {
    changeTextContent(`.${player}-current`, 'WINNER! 🏆');
    dieImg.classList.add('hidden');
    playing = false;
  } else {
    switchPlayer();
  }
}

btnRoll.addEventListener('click', function () {
  if (playing) {
    const rollValue = Math.ceil(Math.random() * 6);

    dieImg.src = `./img/dice-${rollValue}.png`;
    dieImg.classList.remove('hidden');

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
});

btnHold.addEventListener('click', function () {
  if (playing) {
    const isPlayer1Active = player1.classList.contains('active');

    if (isPlayer1Active) {
      totalScore[0] += currentScore[0];
      changeTextContent('.player1-score', totalScore[0]);
      currentScore[0] = 0;
      changeTextContent('.player1-current', currentScore[0]);

      checkWinner(totalScore[0], 'player1');
    } else {
      totalScore[1] += currentScore[1];
      changeTextContent('.player2-score', totalScore[1]);
      currentScore[1] = 0;
      changeTextContent('.player2-current', currentScore[1]);

      checkWinner(totalScore[1], 'player2');
    }
  }
});

btnReset.addEventListener('click', init);
