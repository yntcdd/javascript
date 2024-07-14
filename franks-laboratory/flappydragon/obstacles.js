const obstaclesArray = [];

class Obstacle {
  constructor() {
    this.top = (Math.random() * canvas.height) / 3 + 20;
    this.bottom = (Math.random() * canvas.height) / 3 + 20;
    this.x = canvas.width;
    this.width = 20;
    this.color = 'hsla(' + hue + ', 100%, 50%, 1)';
    this.counted = false;
  }
  draw() {
    context.fillStyle = this.color;
    context.fillRect(this.x, 0, this.width, this.top);
    context.fillRect(
      this.x,
      canvas.height - this.bottom,
      this.width,
      this.bottom
    );
  }
  update() {
    this.x -= gamespeed;
    if (!this.counted && this.x < bird.x) {
      score += 1;
      this.counted = true;
    }
    this.draw();
  }
}

function HandleObstacles() {
  if (frame % 150 === 0) {
    obstaclesArray.unshift(new Obstacle());
  }
  for (const element of obstaclesArray) {
    element.update();
  }
  if (obstaclesArray.length > 20) {
    obstaclesArray.pop(obstaclesArray[0]);
  }
}
