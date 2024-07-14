const canvas = document.querySelector('#canvas1');
const context = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 400;

let spacePressed = false;
let angle = 0;
let hue = 0;
let frame = 0;
let score = 0;
let gamespeed = 2;

const gradient = context.createLinearGradient(0, 0, 0, 70);
gradient.addColorStop('0.4', '#fff');
gradient.addColorStop('0.5', '#000');
gradient.addColorStop('0.55', '#4040ff');
gradient.addColorStop('0.6', '#000');
gradient.addColorStop('0.9', '#fff');

const background = new Image();
background.src = 'BG.png';
const BG = {
  x1: 0,
  x2: canvas.width,
  y: 0,
  width: canvas.width,
  height: canvas.height
};
function handleBackground() {
  if (BG.x1 <= -BG.width + gamespeed) BG.x1 = BG.width;
  else BG.x1 -= gamespeed;
  if (BG.x2 <= -BG.width + gamespeed) BG.x2 = BG.width;
  else BG.x2 -= gamespeed;
  context.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
  context.drawImage(background, BG.x2, BG.y, BG.width, BG.height);
}

function animate() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  // context.fillRect(10, canvas.height - 90, 50, 50);
  handleBackground();
  HandleObstacles();
  bird.update();
  bird.draw();
  context.fillStyle = gradient;
  context.font = '90px Georgia';
  context.strokeText(score, 450, 70);
  context.fillText(score, 450, 70);
  HandleParticles();
  handleCollisions();
  if (handleCollisions()) return;
  requestAnimationFrame(animate);
  angle += 0.12;
  hue += 1;
  frame += 1;
}
animate();

window.addEventListener('keydown', function (event_) {
  if (event_.code === 'Space') spacePressed = true;
});

window.addEventListener('keyup', function (event_) {
  if (event_.code === 'Space') spacePressed = false;
  bird.frameX = 0;
});

const bang = new Image();
bang.src = 'bang.png';
function handleCollisions() {
  for (const element of obstaclesArray) {
    if (
      bird.x < element.x + element.width &&
      bird.x + bird.width > element.x &&
      ((bird.y < 0 + element.top && bird.y + bird.height > 0) ||
        (bird.y > canvas.height - element.bottom &&
          bird.y + bird.height < canvas.height))
    ) {
      //collision dectected
      context.drawImage(bang, bird.x, bird.y, 50, 50);
      context.font = '25px Georgia';
      context.fillStyle = 'whi';
      context.fillText(
        'Game Over, your score is ' + score,
        160,
        canvas.height / 2 - 10
      );
      return true;
    }
  }
}
