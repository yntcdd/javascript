/* eslint-disable no-undef */
function animate() {
  context1.clearRect(0, 0, canvas.width, canvas.height);
  context2.clearRect(0, 0, canvas.width, canvas.height);
  context3.clearRect(0, 0, canvas.width, canvas.height);
  context4.clearRect(0, 0, canvas.width, canvas.height);
  context5.clearRect(0, 0, canvas.width, canvas.height);
  handleRipples();
  context2.drawImage(background_lvl2, 0, 0, canvas.width, canvas.height);
  handleParticles();
  frogger.draw();
  frogger.update();
  handleObstacles();
  handleScoreBoard();
  context4.drawImage(grass, 0, 0, canvas.width, canvas.height);
  frame += 1;
  requestAnimationFrame(animate);
}

animate();

// event listeners
window.addEventListener('keydown', function (event_) {
  keys = [];
  keys[event_.keyCode] = true;
  if (keys[37] || keys[38] || keys[39] || keys[40]) {
    frogger.jump();
  }
});

window.addEventListener('keyup', function (event_) {
  delete keys[event_.keyCode];
  frogger.moving = false;
  frogger.frameX = 0;
});

function scored() {
  score += 1;
  gameSpeed += 0.05;
  frogger.x = canvas.width / 2 - frogger.width / 2;
  frogger.y = canvas.height - frogger.height - 40;
}

function handleScoreBoard() {
  context4.fillStyle = 'black';
  context4.strokeStyle = 'black';
  context4.font = '15px Verdana';
  context4.strokeText('Score', 265, 15);
  context4.font = '60px Verdana';
  context4.fillText(score, 270, 65);
  context4.font = '15px Verdana';
  context4.strokeText('Collisions: ' + collisionsCount, 10, 175);
  context4.strokeText('Game Speed:' + gameSpeed.toFixed(1), 10, 195);
}

// collision dectection between two rectangles
function collision(first, second) {
  return !(
    first.x > second.x + second.width ||
    first.x + first.width < second.x ||
    first.y > second.y + second.height ||
    first.y + first.height < second.y
  );
}

function resetGame() {
  frogger.x = canvas.width / 2 - frogger.width / 2;
  frogger.y = canvas.height - frogger.height - 40;
  score = 0;
  collisionsCount += 1;
  gameSpeed = 1;
}
