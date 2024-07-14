/* eslint-disable unicorn/prefer-dom-node-text-content */
/* eslint-disable unicorn/prevent-abbreviations */
const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');
const scale = 10;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let snake;

(function setup() {
  snake = new Snake();
  fruit = new Fruit();

  fruit.pickLocation();

  window.setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fruit.draw();
    snake.update();
    snake.draw();
    if (snake.eat(fruit)) {
      fruit.pickLocation();
    }
    snake.checkCollision();
    document.querySelector('.score').innerText = snake.total;
  }, 250);
})();

window.addEventListener('keydown', (evt) => {
  const direction = evt.key.replace('Arrow', '');
  snake.changeDirection(direction);
  if (evt.key == 1 || 2 || 3 || 4 || 5 || 6 || 7 || 8 || 9) {
    const amount = evt.key;
    let nextSnakeX = amount * scale;
    for (let i = 0; i < amount; i++) {
      snake.total += 1;
      snake.update();
    }
  }
});
