/* eslint-disable unicorn/no-null */
class Normal {
  constructor(x, y, angle, game) {
    this.x = null;
    this.y = null;
    this.width = null;
    this.height = null;
    this.angle = angle;
    this.image = null;
    this.speed = null;
    this.game = game;
    this.pointed = false;
    this.rotation = null;
  }
  draw(context) {
    context.fillStyle = this.color;
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
  rotate(context, deg) {
    context.translate(this.x + this.width / 2, this.y + this.height / 2);
    context.rotate((deg * Math.PI) / 180);
    context.translate(-this.x - this.width / 2, -this.y - this.height / 2);
    this.rotation = deg;
  }
  update() {
    this.x += this.speed * Math.cos((this.angle * Math.PI) / 180);
    this.y += this.speed * Math.sin((this.angle * Math.PI) / 180);
  }
}
class Boomerang {
  constructor(x, y, angle, game, bloonX, bloonYT) {
    this.bloonX = bloonX;
    this.bloonYT = bloonYT;
    if (this.bloonYT > y && this.bloonX < x) {
      this.startX = x - 40;
      this.startY = y + 50;
    } else if (this.bloonYT > y && this.bloonX > x) {
      this.startX = x + 50;
      this.startY = y + 50;
    } else if (this.bloonYT < y && this.bloonX < x) {
      this.startX = x - 50;
      this.startY = y - 50;
    } else if (this.bloonYT < y && this.bloonX > x) {
      this.startX = x + 50;
      this.startY = y - 50;
    }
    this.x = null;
    this.y = null;
    this.width = null;
    this.height = null;
    this.angle = angle;
    this.deg = 0;
    this.image = null;
    this.game = game;
    this.pointed = false;
    this.rotation = null;
  }
  draw(context) {
    context.fillStyle = this.color;
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
  rotate(context, deg) {
    context.translate(this.x + this.width / 2, this.y + this.height / 2);
    context.rotate((deg * Math.PI) / 180);
    context.translate(-this.x - this.width / 2, -this.y - this.height / 2);
    this.rotation = deg;
  }
  update() {
    this.x = this.startX + 100 * Math.cos(this.deg);
    this.y = this.startY + 100 * Math.sin(this.deg);
    this.deg += 0.3;
  }
}
export class DartNormal extends Normal {
  constructor(x, y, angle, game) {
    super(x, y, angle, game);
    this.type = 'normal';
    this.x = x;
    this.y = y;
    this.width = 124 / 4;
    this.height = 74 / 4;
    this.angle = angle;
    this.color = `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;
    this.image = document.querySelector('#dartNormal');
    this.speed = 10;
    this.game = game;
    this.pointed = false;
    this.pierce = 2;
    this.bindexhit = null;
  }
}
export class Boomerang000 extends Boomerang {
  constructor(x, y, angle, game, bloonX, bloonY) {
    super(x, y, angle, game, bloonX, bloonY);
    this.bloonX = bloonX;
    this.bloonYT = bloonY;
    this.type = 'boomerang';
    this.x = x;
    this.y = y;
    this.width = 25;
    this.height = 44;
    this.angle = angle;
    this.color = `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;
    this.image = document.querySelector('#boomerang000');
    this.game = game;
    this.pointed = false;
    this.pierce = 4;
    this.bindexhit = null;
  }
}
