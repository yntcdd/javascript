document.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') {
    console.log(event.key);
    moveLeft();
  }
  if (event.key === 'ArrowRight') {
    console.log(event.key);
    moveRight();
  }
});
const character = document.querySelector('#character');
function moveLeft() {
  let left = Number.parseInt(
    window.getComputedStyle(character).getPropertyValue('left')
  );
  left -= 100;
  if (left >= 0) {
    character.style.left = left + 'px';
  }
}
function moveRight() {
  let left = Number.parseInt(
    window.getComputedStyle(character).getPropertyValue('left')
  );
  left += 100;
  if (left < 300) {
    character.style.left = left + 'px';
  }
}
const block = document.querySelector('#block');
let counter = 0;
block.addEventListener('animationiteration', () => {
  const random = Math.floor(Math.random() * 3);
  left = random * 100;
  block.style.left = left + 'px';
  counter += 1;
});
setInterval(function () {
  const characterLeft = Number.parseInt(
    window.getComputedStyle(character).getPropertyValue('left')
  );
  const blockLeft = Number.parseInt(
    window.getComputedStyle(block).getPropertyValue('left')
  );
  const blockTop = Number.parseInt(
    window.getComputedStyle(block).getPropertyValue('top')
  );
  if (characterLeft == blockLeft && blockTop < 500 && blockTop > 300) {
    // alert('Game over. Score: ' + counter);
    block.style.animation = 'none';
  }
}, 1);

document.querySelector('#right').addEventListener('touchstart', moveRight());
document.querySelector('#left').addEventListener('touchstart', moveLeft());
