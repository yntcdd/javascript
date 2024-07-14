/* eslint-disable no-unused-vars */
let character = document.querySelector('#character');
let block = document.querySelector('#block');

function jump() {
  if (character.classList != 'animate') {
    character.classList.add('animate');
  }
  setTimeout(function () {
    character.classList.remove('animate');
  }, 500);
}

let checkDead = setInterval(function () {
  let characterTop = Number.parseInt(
    window.getComputedStyle(character).getPropertyValue('top')
  );
  let blockLeft = Number.parseInt(
    window.getComputedStyle(block).getPropertyValue('left')
  );
  if (blockLeft < 20 && blockLeft > 0 && characterTop >= 130) {
    block.style.animation = 'none';
    block.style.display = 'none';
    alert('Game Over!');
  }
}, 10);
