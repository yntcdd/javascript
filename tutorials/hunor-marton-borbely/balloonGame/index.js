/* eslint-disable unicorn/no-array-for-each */
/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable unicorn/prefer-query-selector */
let gameStarted;

let balloonX;
let balloonY;

let verticalVelocity;
let horizontalVelocity;

let heating;

let trees;

const mainAreaWidth = 400;
const mainAreaHeight = 375;
let horizontalPadding = (window.innerWidth - mainAreaWidth) / 2;
let verticalPadding = (window.innerHeight - mainAreaHeight) / 2;

const canvas = document.getElementById('game');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

Math.sinus = function (degree) {
  return Math.sin((degree / 180) * Math.PI);
};

resetGame();

function resetGame() {
  gameStarted = false;
  heating = false;
  verticalVelocity = 5;
  horizontalVelocity = 5;
  balloonX = 0;
  balloonY = 0;

  trees = [];
  for (let i = 1; i < window.innerWidth / 50; i++) generateTree();

  draw();
}

function generateTree() {
  const minimumGap = 50;
  const maximumGap = 600;

  const x =
    trees.length > 0
      ? trees[trees.length - 1].x +
        minimumGap +
        Math.floor(Math.random() * (maximumGap - minimumGap))
      : 400;

  const h = 60 + Math.random() * 80;

  const r1 = 32 + Math.random() * 16;
  const r2 = 32 + Math.random() * 16;
  const r3 = 32 + Math.random() * 16;
  const r4 = 32 + Math.random() * 16;
  const r5 = 32 + Math.random() * 16;
  const r6 = 32 + Math.random() * 16;
  const r7 = 32 + Math.random() * 16;

  const treeColors = ['#6D8821', '#8FAC34', '#98B333'];
  const color = treeColors[Math.floor(Math.random() * 3)];

  trees.push({ x, h, r1, r2, r3, r4, r5, r6, r7, color });
}

resetGame();

window.addEventListener('keydown', function (event) {
  if (event.key == ' ') {
    event.preventDefault();
    resetGame();
    return;
  }
});

window.addEventListener('mousedown', function () {
  heating = true;

  if (!gameStarted) {
    gameStarted = true;
    window.requestAnimationFrame(animate);
  }
});

window.addEventListener('mouseup', function () {
  heating = false;
});

window.addEventListener('resize', function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  horizontalPadding = (window.innerWidth - mainAreaWidth) / 2;
  verticalPadding = (window.innerHeight - mainAreaHeight) / 2;
  draw();
});

function animate() {
  if (!gameStarted) return;

  const velocityChangeWhileHeating = 0.4;
  const velocityChangeWhileCooling = 0.2;

  if (heating) {
    if (verticalVelocity > -8) {
      verticalVelocity -= velocityChangeWhileHeating;
    }
  } else if (verticalVelocity < 5) {
    verticalVelocity += velocityChangeWhileCooling;
  }

  balloonY += verticalVelocity;
  if (balloonY > 0) balloonY = 0;
  if (balloonY < 0) balloonX += horizontalVelocity;

  if (trees[0].x - (balloonX - horizontalPadding) < -100) {
    trees.shift();
    generateTree();
  }

  draw();

  const hit = hitDetection();
  if (hit) {
    return;
  }

  window.requestAnimationFrame(animate);
}

function draw() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  ctx.save();
  ctx.translate(0, verticalPadding + mainAreaHeight);

  ctx.translate(horizontalPadding, 0);

  ctx.translate(-balloonX, 0);

  drawTrees();
  drawBalloon();

  ctx.restore();
  drawTrees;
}

function drawCircle(cx, cy, radius) {
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
  ctx.fill();
}

function drawTrees() {
  trees.forEach(({ x, h, r1, r2, r3, r4, r5, r6, r7, color }) => {
    ctx.save();
    ctx.translate(x, 0);

    // Trunk
    const trunkWidth = 40;
    ctx.fillStyle = '#885F37';
    ctx.beginPath();
    ctx.moveTo(-trunkWidth / 2, 0);
    ctx.quadraticCurveTo(-trunkWidth / 4, -h / 2, -trunkWidth / 2, -h);
    ctx.lineTo(trunkWidth / 2, -h);
    ctx.quadraticCurveTo(trunkWidth / 4, -h / 2, trunkWidth / 2, 0);
    ctx.closePath();
    ctx.fill();

    // Crown
    ctx.fillStyle = color;
    drawCircle(-20, -h - 15, r1);
    drawCircle(-30, -h - 25, r2);
    drawCircle(-20, -h - 35, r3);
    drawCircle(0, -h - 45, r4);
    drawCircle(20, -h - 35, r5);
    drawCircle(30, -h - 25, r6);
    drawCircle(20, -h - 15, r7);

    ctx.restore();
  });
}

function drawBalloon() {
  ctx.save();

  ctx.translate(balloonX, balloonY);

  // Cart
  ctx.fillStyle = '#DB504A';
  ctx.fillRect(-30, -40, 60, 10);
  ctx.fillStyle = '#EA9E8D';
  ctx.fillRect(-30, -30, 60, 30);

  // Cables
  ctx.strokeStyle = '#D62828';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-24, -40);
  ctx.lineTo(-24, -60);
  ctx.moveTo(24, -40);
  ctx.lineTo(24, -60);
  ctx.stroke();

  // Balloon
  ctx.fillStyle = '#D62828';
  ctx.beginPath();
  ctx.moveTo(-30, -60);
  ctx.quadraticCurveTo(-80, -120, -80, -160);
  ctx.arc(0, -160, 80, Math.PI, 0, false);
  ctx.quadraticCurveTo(80, -120, 30, -60);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

function hitDetection() {
  const cartBottomLeft = { x: balloonX - 30, y: balloonY };
  const cartBottomRight = { x: balloonX + 30, y: balloonY };
  const cartTopRight = { x: balloonX + 30, y: balloonY - 40 };

  for (const { x, h, r1, r2, r3, r4, r5 } of trees) {
    const treeBottomLeft = { x: x - 20, y: -h - 15 };
    const treeLeft = { x: x - 30, y: -h - 25 };
    const treeTopLeft = { x: x - 20, y: -h - 35 };
    const treeTop = { x: x, y: -h - 45 };
    const treeTopRight = { x: x + 20, y: -h - 35 };

    if (getDistance(cartBottomLeft, treeBottomLeft) < r1) return true;
    if (getDistance(cartBottomRight, treeBottomLeft) < r1) return true;
    if (getDistance(cartTopRight, treeBottomLeft) < r1) return true;

    if (getDistance(cartBottomLeft, treeLeft) < r2) return true;
    if (getDistance(cartBottomRight, treeLeft) < r2) return true;
    if (getDistance(cartTopRight, treeLeft) < r2) return true;

    if (getDistance(cartBottomLeft, treeTopLeft) < r3) return true;
    if (getDistance(cartBottomRight, treeTopLeft) < r3) return true;
    if (getDistance(cartTopRight, treeTopLeft) < r3) return true;

    if (getDistance(cartBottomLeft, treeTop) < r4) return true;
    if (getDistance(cartBottomRight, treeTop) < r4) return true;
    if (getDistance(cartTopRight, treeTop) < r4) return true;

    if (getDistance(cartBottomLeft, treeTopRight) < r5) return true;
    if (getDistance(cartBottomRight, treeTopRight) < r5) return true;
    if (getDistance(cartTopRight, treeTopRight) < r5) return true;
  }
}

function getDistance(point1, point2) {
  return Math.sqrt((point2.x - point1.x) ** 2 + (point2.y - point1.y) ** 2);
}
