const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const countdownBoard = document.querySelector('.countdown');
const startButton = document.querySelector('.startButton');
const highScoreBoard = document.querySelector('.highscore');

let lastHole;
let timeUp = false;
let timeLimit = 20_000;
let score = 0;
let countdown;
let highScore = localStorage.getItem('game1HighScore') || 0;
highScoreBoard.textContent = 'HIGH SCORE: ' + highScore;

function pickRandomHole(holes) {
  const randomHole = Math.floor(Math.random() * holes.length);
  const hole = holes[randomHole];
  if (hole === lastHole) {
    return pickRandomHole(holes);
  }
  lastHole = hole;
  return hole;
}
function popOut() {
  const time = Math.random() * 1300 + 400;
  const hole = pickRandomHole(holes);
  hole.classList.add('up');
  setTimeout(function () {
    hole.classList.remove('up');
    if (!timeUp) popOut();
  }, time);
}

function startGame() {
  countdown = timeLimit / 1000;
  scoreBoard.textContent = 0;
  scoreBoard.style.display = 'block';
  countdownBoard.textContent = countdown;
  timeUp = false;
  score = 0;
  popOut();
  setTimeout(function () {
    timeUp = true;
  }, timeLimit);

  let startCountdown = setInterval(function () {
    countdown -= 1;
    countdownBoard.textContent = countdown;
    if (countdown < 0) {
      countdown = 0;
      clearInterval(startCountdown);
      checkHighScore();
      countdownBoard.textContent =
        'Times UP!! thank you for protecting our planet! This is the way!';
    }
  }, 1000);
}
startButton.addEventListener('click', startGame);

function whack() {
  score += 1;
  this.style.backgroundImage = 'url("yoda2.png")';
  this.style.pointerEvents = 'none';
  setTimeout(() => {
    this.style.backgroundImage = 'url("yoda1.png")';
    this.style.pointerEvents = 'all';
  }, 800);
  scoreBoard.textContent = score;
}

for (const mole of moles) mole.addEventListener('click', whack);

function checkHighScore() {
  if (score > localStorage.getItem('game1highScore')) {
    localStorage.setItem('game1HighScore', score);
    highScore = score;
    highScoreBoard.textContent = 'HIGH SCORE: ' + highScore;
  }
}
