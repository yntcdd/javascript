class Obstacle {
  constructor(x, y, width, height, speed, type) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.type = type;
    this.frameX = 0;
    this.frameY = 0;
    this.randomise = Math.floor(Math.random() * 30 + 30);
    this.carType = Math.floor(Math.random() * numberOfCars);
  }
  draw() {
    if (this.type === 'turtle') {
      if (frame % this.randomise === 3) {
        if (this.frameX >= 1) this.frameX = 0;
        else this.frameX += 1;
      }
      context1.drawImage(
        turtle,
        this.frameX * 70,
        this.frameY * 70,
        70,
        70,
        this.x,
        this.y,
        this.width,
        this.height
      );
    } else if (this.type === 'log') {
      context1.drawImage(log, this.x, this.y, this.width, this.height);
    } else {
      context2.drawImage(
        car,
        this.frameX * this.width,
        this.carType * this.height,
        grid * 2,
        grid,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  }
  update() {
    this.x += this.speed * gameSpeed;
    if (this.speed > 0) {
      if (this.x > canvas.width + this.width) {
        this.x = 0 - this.width;
        this.carType = Math.floor(Math.random() * numberOfCars);
      }
    } else {
      this.frameX = 1;
      if (this.x < 0 - this.width) {
        this.x = canvas.width + this.width;
        this.carType = Math.floor(Math.random() * numberOfCars);
      }
    }
  }
}

function initObstacles() {
  //lane 1
  for (let index = 0; index < 2; index++) {
    let x = index * 350;
    carsArray.push(
      new Obstacle(x, canvas.height - grid * 2 - 20, grid * 2, grid, 1, 'car')
    );
  }
  // lane 2
  for (let index = 0; index < 2; index++) {
    let x = index * 300;
    carsArray.push(
      new Obstacle(x, canvas.height - grid * 3 - 20, grid * 2, grid, -2, 'car')
    );
  }
  // lane 3
  for (let index = 0; index < 2; index++) {
    let x = index * 400;
    carsArray.push(
      new Obstacle(x, canvas.height - grid * 4 - 20, grid * 2, grid, 2, 'car')
    );
  }
  // lane 4
  for (let index = 0; index < 2; index++) {
    let x = index * 400;
    logsArray.push(
      new Obstacle(x, canvas.height - grid * 5 - 20, grid * 2, grid, -2, 'log')
    );
  }
  // lane 5
  for (let index = 0; index < 2; index++) {
    let x = index * 200;
    logsArray.push(
      new Obstacle(x, canvas.height - grid * 6 - 20, grid, grid, 1, 'turtle')
    );
  }
}
initObstacles();

function handleObstacles() {
  for (const element of carsArray) {
    element.update();
    element.draw();
  }
  for (const element of logsArray) {
    element.update();
    element.draw();
  }
  // collision with car
  for (const element of carsArray) {
    if (collision(frogger, element)) {
      context4.drawImage(
        collisions,
        0,
        100,
        100,
        100,
        frogger.x,
        frogger.y,
        50,
        50
      );
      resetGame();
    }
  }
  // collisions with logs/turtles
  if (frogger.y < 250 && frogger.y > 100) {
    safe = false;

    for (const element of logsArray) {
      if (collision(frogger, element)) {
        frogger.x += element.speed;
        safe = true;
      }
    }
    if (!safe) {
      for (let index = 0; index < 30; index++) {
        ripplesArray.unshift(new Particle(frogger.x, frogger.y));
      }
      resetGame();
    }
  }
}
