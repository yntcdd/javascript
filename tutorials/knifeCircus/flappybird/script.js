/* eslint-disable no-unused-vars */
let block = document.querySelector('#block');
let hole = document.querySelector('#hole');
let character = document.querySelector('#character');
let jumping = 0;
let counter = 0;

hole.addEventListener('animationiteration', () => {
  let random = -(Math.random() * 300 + 150);
  hole.style.top = random + 'px';
  counter += 1;
});
setInterval(function () {
  let characterTop = Number.parseInt(
    window.getComputedStyle(character).getPropertyValue('top')
  );
  if (jumping == 0) {
    character.style.top = characterTop + 3 + 'px';
  }
  let blockLeft = Number.parseInt(
    window.getComputedStyle(block).getPropertyValue('left')
  );
  let holeTop = Number.parseInt(
    window.getComputedStyle(hole).getPropertyValue('top')
  );
  let cTop = -(500 - characterTop);
  if (
    characterTop > 480 ||
    (blockLeft < 20 &&
      blockLeft > -50 &&
      (cTop < holeTop || cTop > holeTop + 130))
  ) {
    alert('Game over. Score: ' + (counter - 1));
    character.style.top = 100 + 'px';
    counter = 0;
  }
}, 10);

function jump() {
  jumping = 1;
  let jumpCount = 0;
  let jumpInterval = setInterval(function () {
    let characterTop = Number.parseInt(
      window.getComputedStyle(character).getPropertyValue('top')
    );
    if (characterTop > 6 && jumpCount < 15) {
      character.style.top = characterTop - 5 + 'px';
    }
    if (jumpCount > 20) {
      clearInterval(jumpInterval);
      jumping = 0;
      jumpCount = 0;
    }
    jumpCount += 1;
  }, 10);
}
