class Particle {
  constructor(x, y) {
    this.x = x + 20;
    this.y = y + 20;
    this.radius = Math.random() * 20 + 1;
    this.opacity = 1;
    this.directionX = Math.random() * 2 - 0.5;
    this.directionY = Math.random() * 2 - 0.5;
  }
  draw() {
    context3.fillStyle = 'rgba(150, 150, 150,' + this.opacity + ')';
    context3.beginPath();
    context3.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context3.fill();
    context3.closePath();
  }
  update() {
    this.x += this.directionX;
    this.y += this.directionY;
    if (this.opacity > 0.1) {
      this.opacity -= 0.9;
    }
    if (this.radius > 0.15) {
      this.radius -= 0.14;
    }
  }
  drawRipple() {
    context1.strokeStyle = 'rgba(255, 255, 255,' + this.opacity + ')';
    context1.beginPath();
    context1.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context1.stroke();
    context1.closePath();
  }
  ripple() {
    if (this.radius < 50) {
      this.radius += 0.7;
      this.x -= 0.03;
      this.y -= 0.03;
    }
    if (this.opacity > 0) {
      this.opacity -= 0.02;
    }
  }
}
function handleRipples() {
  for (const element of ripplesArray) {
    element.ripple();
    element.drawRipple();
  }
  if (ripplesArray.length > 20) {
    for (let index = 0; index < 5; index++) {
      ripplesArray.pop();
    }
  }
  if (
    (keys[37] || keys[38] || keys[39] || keys[40]) &&
    frogger.y < 250 &&
    frogger.y > 100
  ) {
    for (let index = 0; index < 20; index++) {
      ripplesArray.unshift(new Particle(frogger.x, frogger.y));
    }
  }
}
function handleParticles() {
  for (const element of particlesArray) {
    element.update();
    element.draw();
  }
  if (particlesArray.length > maxParticles) {
    for (let index = 0; index < 30; index++) {
      particlesArray.pop();
    }
  }
  if (
    (keys[37] || keys[38] || keys[39] || keys[40]) &&
    frogger.y > 250 &&
    particlesArray.length < maxParticles + 10
  ) {
    for (let index = 0; index < 10; index++) {
      particlesArray.unshift(new Particle(frogger.x, frogger.y));
    }
  }
}
