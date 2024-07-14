// Canvas setup
const canvas = document.querySelector('#canvas1');
const context = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;

let score = 0;
let gameFrame = 0;
context.font = '50px Georgia';
const gameSpeed = 1;
let gameOver = false;

// Mouse Interactivity
let canvasPosition = canvas.getBoundingClientRect();
const mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  click: false
};
canvas.addEventListener('mousedown', function (event) {
  mouse.click = true;
  mouse.x = event.x - canvasPosition.left;
  mouse.y = event.y - canvasPosition.top;
});
canvas.addEventListener('mouseup', function () {
  mouse.click = false;
});

// Player
const playerLeft = new Image();
playerLeft.src = 'fish_swim_left.png';
const playerRight = new Image();
playerRight.src = 'fish_swim_right.png';

class Player {
  constructor() {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.radius = 50;
    this.angle = 0;
    this.frameX = 0;
    this.frameY = 0;
    this.frame = 0;
    this.spriteWidth = 498;
    this.spriteHeight = 327;
  }
  update() {
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    const theta = Math.atan2(dy, dx);
    this.angle = theta;
    if (mouse.x != this.x) {
      this.x -= dx / 20;
    }
    if (mouse.y != this.y) {
      this.y -= dy / 20;
    }
  }
  draw() {
    if (mouse.click) {
      context.lineWidth = 0.2;
      context.beginPath();
      context.moveTo(this.x, this.y);
      context.lineTo(mouse.x, mouse.y);
      context.stroke();
    }
    // ctx.fillStyle = 'red';
    // ctx.beginPath();
    // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    // ctx.fill();
    // ctx.closePath();
    // ctx.fillRect(this.x, this.y, this.radius, 10);

    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.angle);
    if (this.x >= mouse.x) {
      context.drawImage(
        playerLeft,
        this.frameX * this.spriteWidth,
        this.frameY * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        0 - 60,
        0 - 45,
        this.spriteWidth / 4,
        this.spriteHeight / 4
      );
    } else {
      context.drawImage(
        playerRight,
        this.frameX * this.spriteWidth,
        this.frameY * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        0 - 60,
        0 - 45,
        this.spriteWidth / 4,
        this.spriteHeight / 4
      );
    }
    context.restore();
    if (gameFrame % 5 == 0) {
      this.frame += 1;
      if (this.frame >= 12) this.frame = 0;
      if (this.frame == 3 || this.frame == 7 || this.frame == 11) {
        this.frameX = 0;
      } else {
        this.frameX += 1;
      }
      if (this.frame < 3) this.frameY = 0;
      else if (this.frame < 7) this.frameY = 1;
      else if (this.frame < 11) this.frameY = 2;
      else this.frameY = 0;
    }
  }
}
const player = new Player();

// Bubbles
const bubblesArray = [];
const bubbleImage = new Image();
bubbleImage.src = 'bubble_pop_frame_01.png';

class Bubble {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + 100;
    this.radius = 50;
    this.speed = Math.random() * 5 + 1;
    this.distance;
    this.counted = false;
    this.sound = Math.random() <= 0.5 ? 'sound1' : 'sound2';
  }
  update() {
    this.y -= this.speed;
    const dx = this.x - player.x;
    const dy = this.y - player.y;
    this.distance = Math.sqrt(dx * dx + dy * dy);
  }
  draw() {
    // ctx.fillStyle = 'blue';
    // ctx.beginPath();
    // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    // ctx.fill();
    // ctx.closePath();
    // ctx.stroke();
    context.drawImage(
      bubbleImage,
      this.x - 65,
      this.y - 65,
      this.radius * 2.6,
      this.radius * 2.6
    );
  }
}

const bubblePop1 = document.createElement('audio');
bubblePop1.src = 'Plop.ogg';
const bubblePop2 = document.createElement('audio');
bubblePop2.src = 'bubbles1.wav';

function handleBubbles() {
  if (gameFrame % 50 == 0) {
    bubblesArray.push(new Bubble());
  }
  for (let index = 0; index < bubblesArray.length; index++) {
    bubblesArray[index].update();
    bubblesArray[index].draw();
    if (bubblesArray[index].y < 0 - bubblesArray[index].radius * 2) {
      bubblesArray.splice(index, 1);
      index -= 1;
    } else if (
      bubblesArray[index].distance <
        bubblesArray[index].radius + player.radius &&
      !bubblesArray[index].counted
    ) {
      if (bubblesArray[index].sound == 'sound1') {
        // bubblePop1.play();
      } else {
        // bubblePop2.play();
      }
      score += 1;
      bubblesArray[index].counted = true;
      bubblesArray.splice(index, 1);
      index -= 1;
    }
  }
}
for (let index = 0; index < bubblesArray.length; index++) {}

//Repeating backgrounds
const background = new Image();
background.src = 'background1.png';

const BG = {
  x1: 0,
  x2: canvas.width,
  y: 0,
  width: canvas.width,
  height: canvas.height
};

function handleBackground() {
  BG.x1 -= gameSpeed;
  if (BG.x1 < -BG.width) BG.x1 = BG.width;
  BG.x2 -= gameSpeed;
  if (BG.x2 < -BG.width) BG.x2 = BG.width;
  context.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
  context.drawImage(background, BG.x2, BG.y, BG.width, BG.height);
}

// Enemies
const enemyImage = new Image();
enemyImage.src = 'enemy1.png';

class Enemy {
  constructor() {
    this.x = canvas.width - 200;
    this.y = Math.random() * (canvas.height - 150) + 90;
    this.radius = 60;
    this.speed = Math.random() * 2 + 2;
    this.frame = 0;
    this.frameX = 0;
    this.frameY = 0;
    this.spriteWidth = 418;
    this.spriteHeight = 397;
  }
  draw() {
    // ctx.fillStyle = 'red';
    // ctx.beginPath();
    // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    // ctx.fill();
    context.drawImage(
      enemyImage,
      this.frameX * this.spriteWidth,
      this.frameY * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      this.x - 60,
      this.y - 70,
      this.spriteWidth / 3,
      this.spriteHeight / 3
    );
  }
  update() {
    this.x -= this.speed;
    if (this.x < 0 - this.radius * 2) {
      this.x = canvas.width + 200;
      this.y = Math.random() * (canvas.height - 150) + 90;
      this.speed = Math.random() * 2 + 2;
    }
    if (gameFrame % 5 == 0) {
      this.frame += 1;
      if (this.frame >= 12) this.frame = 0;
      if (this.frame == 3 || this.frame == 7 || this.frame == 11) {
        this.frameX = 0;
      } else {
        this.frameX += 1;
      }
      if (this.frame < 3) this.frameY = 0;
      else if (this.frame < 7) this.frameY = 1;
      else if (this.frame < 11) this.frameY = 2;
      else this.frameY = 0;
    }
    // collision with player
    const dx = this.x - player.x;
    const dy = this.y - player.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < this.radius + player.radius) {
      handleGameOver();
    }
  }
}

const enemy1 = new Enemy();
function handleEnemies() {
  enemy1.draw();
  enemy1.update();
}

function handleGameOver() {
  context.fillStyle = 'white';
  context.font = '40px Georgia';
  context.fillText('GAME OVER, you reached score ' + score, 20, 250);
  gameOver = true;
}
//Animation Loop
function animate() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  handleBackground();
  handleBubbles();
  player.update();
  player.draw();
  handleEnemies();
  context.font = '50px Georgia';
  context.fillStyle = 'black';
  context.fillText('score: ' + score, 10, 50);
  gameFrame += 1;
  if (!gameOver) requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', function () {
  canvasPosition = canvas.getBoundingClientRect();
});
