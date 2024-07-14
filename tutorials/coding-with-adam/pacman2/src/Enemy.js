/* eslint-disable unicorn/filename-case */
import MovingDirection from './MovingDirection.js';

export default class Enemy {
  constructor(x, y, tileSize, velocity, tileMap) {
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.velocity = velocity;
    this.tileMap = tileMap;

    this.#loadImages();

    this.movingDirection = Math.floor(
      Math.random() * Object.keys(MovingDirection).length
    );

    this.directionTimerDefault = this.#random(10, 25);
    this.directionTimer = this.directionTimerDefault;

    this.scaredAboutToExpireTimerDefault = 10;
    this.scaredAboutToExpireTimer = this.scaredAboutToExpireTimerDefault;
  }

  draw(context, pause, pacman) {
    if (!pause) {
      this.#move();
      this.#changeDirection();
    }
    this.#setImage(context, pacman);
  }

  collideWith(pacman) {
    const size = this.tileSize / 2;
    return this.x < pacman.x + size &&
      this.x + size > pacman.x &&
      this.y < pacman.y + size &&
      this.y + size > pacman.y
      ? true
      : false;
  }

  #setImage(context, pacman) {
    if (pacman.powerDotActive) {
      this.#setImageWhenPowerDotIsActive(pacman);
    } else {
      this.image = this.normalGhost;
    }
    context.drawImage(this.image, this.x, this.y, this.tileSize, this.tileSize);
  }

  #setImageWhenPowerDotIsActive(pacman) {
    if (pacman.powerDotAboutToExpire) {
      this.scaredAboutToExpireTimer -= 1;
      if (this.scaredAboutToExpireTimer === 0) {
        this.scaredAboutToExpireTimer = this.scaredAboutToExpireTimerDefault;
        this.image =
          this.image === this.scaredGhost
            ? this.scaredGhost2
            : this.scaredGhost;
      }
    } else {
      this.image = this.scaredGhost;
    }
  }

  #changeDirection() {
    this.directionTimer -= 1;
    let newMoveDirection;
    if (this.directionTimer == 0) {
      this.directionTimer = this.directionTimerDefault;
      newMoveDirection = Math.floor(
        Math.random() * Object.keys(MovingDirection).length
      );
    }

    if (
      newMoveDirection != undefined &&
      this.movingDirection != newMoveDirection &&
      Number.isInteger(this.x / this.tileSize) &&
      Number.isInteger(this.y / this.tileSize) &&
      !this.tileMap.didCollideWithEnvironment(this.x, this.y, newMoveDirection)
    ) {
      this.movingDirection = newMoveDirection;
    }
  }

  #move() {
    if (
      !this.tileMap.didCollideWithEnvironment(
        this.x,
        this.y,
        this.movingDirection
      )
    ) {
      switch (this.movingDirection) {
        case MovingDirection.up:
          this.y -= this.velocity;
          break;
        case MovingDirection.down:
          this.y += this.velocity;
          break;
        case MovingDirection.left:
          this.x -= this.velocity;
          break;
        case MovingDirection.right:
          this.x += this.velocity;
          break;
      }
    }
  }

  #random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  #loadImages() {
    this.normalGhost = new Image();
    this.normalGhost.src = 'images/ghost.png';

    this.scaredGhost = new Image();
    this.scaredGhost.src = 'images/scaredGhost.png';

    this.scaredGhost2 = new Image();
    this.scaredGhost2.src = 'images/scaredGhost2.png';

    this.image = this.normalGhost;
  }
}
