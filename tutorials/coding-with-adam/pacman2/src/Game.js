/* eslint-disable unicorn/filename-case */
import TileMap from './TileMap.js';

const tileSize = 32;
const velocity = 2;

const canvas = document.querySelector('#gameCanvas');
const context = canvas.getContext('2d');
const tileMap = new TileMap(tileSize);
const pacman = tileMap.getPacman(velocity);
const enemies = tileMap.getEnemies(velocity);

let gameOver = false;
let gameWin = false;
const gameOverSound = new Audio('sounds/gameOver.wav');
const gameWinSound = new Audio('sounds/gameWin.wav');

function gameLoop() {
  tileMap.draw(context);
  drawGameEnd();
  pacman.draw(context, pause(), enemies);
  for (const enemy of enemies) enemy.draw(context, pause(), pacman);
  checkGameOver();
  checkGameWin();
}

function checkGameWin() {
  if (!gameWin) {
    gameWin = tileMap.didWin();
    if (gameWin) {
      gameWinSound.play();
    }
  }
}

function checkGameOver() {
  if (!gameOver) {
    gameOver = isGameOver();
    if (gameOver) {
      gameOverSound.play();
    }
  }
}

function isGameOver() {
  return enemies.some(
    (enemy) => !pacman.powerDotActive && enemy.collideWith(pacman)
  );
}

function pause() {
  return !pacman.madeFirstMove || gameOver || gameWin;
}

function drawGameEnd() {
  if (gameOver || gameWin) {
    let text = ' You Win!';
    if (gameOver) {
      text = 'Game Over';
    }

    context.fillStyle = 'black';
    context.fillRect(0, canvas.height / 3.2, canvas.width, 80);

    context.font = '75px comic sans';
    const gradient = context.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop('0', 'magenta');
    gradient.addColorStop('0.5', 'blue');
    gradient.addColorStop('1.0', 'red');

    context.fillStyle = gradient;
    context.fillText(text, 10, canvas.height / 2);
  }
}

tileMap.setCanvasSize(canvas);
setInterval(gameLoop, 1000 / 75);
