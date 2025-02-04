/* eslint-disable unicorn/filename-case */
/* eslint-disable unicorn/no-array-for-each */
/* eslint-disable unicorn/prevent-abbreviations */
import Bullet from './Bullet.js';

export default class BulletController {
  bullets = [];
  timerTillNextBullet = 0;

  constructor(canvas) {
    this.canvas = canvas;
  }

  shoot(x, y, speed, damage, delay) {
    if (this.timerTillNextBullet <= 0) {
      // if (this.bullets.length < 3) {
      this.bullets.push(new Bullet(x, y, speed, damage));
      // }
      this.timerTillNextBullet = delay;
    }
    this.timerTillNextBullet -= 1;
  }
  draw(ctx) {
    this.bullets.forEach((bullet) => {
      if (this.isBulletOffScreen(bullet)) {
        const index = this.bullets.indexOf(bullet);
        this.bullets.splice(index, 1);
      }
      bullet.draw(ctx);
    });
  }

  collideWith(sprite) {
    return this.bullets.some((bullet) => {
      if (bullet.collideWith(sprite)) {
        this.bullets.splice(this.bullets.indexOf(bullet), 1);
        return true;
      }
      return false;
    });
  }

  isBulletOffScreen(bullet) {
    return bullet.y <= -bullet.height;
  }
}
