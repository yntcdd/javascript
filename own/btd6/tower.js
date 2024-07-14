/* eslint-disable unicorn/no-null */
class Tower {
  constructor(x, y, canvas, mouse) {
    this.mouse = mouse;
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.width = 35;
    this.height = 45;
    this.imageWidth = 67;
    this.imageHeight = 45;
    this.dropped = false;
    this.range = null;
    this.clicked = false;
    this.rotation = 0;
    this.image = null;
    this.placeImage = null;
    this.bloonTracked = false;
    this.canplace = false;
    this.bindexhit = null;
  }
  draw(context) {
    if (this.dropped === false || this.clicked === true) {
      context.fillStyle = 'hsla(0, 0%, 0%, 0.3)';
      context.strokeStyle = 'hsla(0, 0%, 100%, 0.5)';
      context.beginPath();
      context.arc(
        this.x + this.imageWidth / 2,
        this.y + this.imageHeight / 2,
        this.range,
        0,
        Math.PI * 2
      );
      context.closePath();
      context.fill();
      context.beginPath();
      context.arc(
        this.x + this.imageWidth / 2,
        this.y + this.imageHeight / 2,
        this.range,
        0,
        Math.PI * 2
      );
      context.closePath();
      context.lineWidth = 3;
      context.stroke();
    }
    if (this.canplace) {
      context.drawImage(
        this.image,
        this.x,
        this.y,
        this.imageWidth,
        this.imageHeight
      );
    } else {
      context.drawImage(
        this.placeImage,
        this.x,
        this.y,
        this.imageWidth,
        this.imageHeight
      );
    }
    context.fillStyle = this.color;
    // context.fillRect(this.x, this.y, this.width, this.height);
    // context.beginPath();
    // context.moveTo(this.x + this.width / 2, this.y);
    // context.lineTo(this.x - this.width, this.y + this.height / 2);
    // context.lineTo(this.x - this.width / 2, this.y);
    // context.lineTo(this.x - this.width, this.y - this.height / 2);
    // context.closePath();
    // context.fill();
  }
  update(mouse) {
    if (this.dropped === false) {
      // this.x = mouse.x + ;
      this.x = mouse.x - this.width * 0.5;
      this.y = mouse.y - this.height * 0.5;
      // this.y = mouse.y;
    } else {
      // set;
    }
  }
  distanceTo(x1, y1, x2, y2) {
    console.log(Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)));
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
  }
  rotate(context, deg) {
    context.translate(this.x + this.width / 2, this.y + this.height / 2);
    context.rotate((deg * Math.PI) / 180);
    context.translate(-this.x - this.width / 2, -this.y - this.height / 2);
    this.rotation = deg;
  }
}
export class DartMonkey000 extends Tower {
  constructor(x, y, canvas, mouse) {
    super(x, y, canvas, mouse);
    this.type = 'DartMonkey000';
    this.attackType = { camo: false, lead: false, purple: true };
    this.mouse = mouse;
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.width = 35;
    this.height = 40;
    this.imageWidth = 67;
    this.imageHeight = 45;
    this.color = `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;
    this.dropped = false;
    this.range = 32 * 4;
    this.clicked = false;
    this.rotation = 0;
    this.image = document.querySelector('#dartmonkey000');
    this.placeImage = document.querySelector('#dartmonkey000red');
    this.bloonTracked = false;
    this.canplace = false;
    this.bindexhit = null;
  }
}

export class BoomerangMonkey000 extends Tower {
  constructor(x, y, canvas, mouse) {
    super(x, y, canvas, mouse);
    this.type = 'BoomerangMonkey000';
    this.attackType = { camo: false, lead: false, purple: true };
    this.mouse = mouse;
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.width = 35;
    this.height = 40;
    this.imageWidth = 67 * 0.8;
    this.imageHeight = 64 * 0.8;
    this.color = `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;
    this.dropped = false;
    this.range = 40 * 4;
    this.clicked = false;
    this.rotation = 0;
    this.image = document.querySelector('#boomerangmonkey000');
    this.placeImage = document.querySelector('#boomerangmonkey000red');
    this.bloonTracked = false;
    this.canplace = false;
    this.bindexhit = null;
  }
}
