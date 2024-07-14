/* eslint-disable unicorn/no-null */

/* eslint-disable unicorn/prevent-abbreviations */
export class UI {
  constructor(game) {
    this.game = game;
    // this.fontSize = 30;
    this.fontFamily = 'Luckiest Guy';
    this.livesImage = document.querySelector('#heart');
    this.coinsImage = document.querySelector('#coins');
    this.shopPage = 1;
    // this.tower = 'null';
  }
  draw(context) {
    context.fillStyle = 'white';
    // lives
    context.drawImage(this.livesImage, 10, 10, 36, 33);
    this.text(context, this.game.health, 50, 35, 30);

    // coins
    context.drawImage(
      this.coinsImage,
      this.game.health.toString().length * 18 + 66,
      10,
      36,
      33
    );
    this.text(
      context,
      this.game.coins,
      this.game.health.toString().length * 18 + 105,
      35,
      30
    );

    // round
    this.text(context, 'Round', this.game.width - 260, 35, 20);

    this.text(
      context,
      this.game.round,
      769 - this.game.round.toString().length * 18,
      60,
      30
    );

    // shop
    context.fillStyle = 'rgb(110, 81, 43)';
    context.fillRect(826, 0, 150, 532);

    context.strokeStyle = 'rgb(77, 56, 30)';
    context.lineWidth = 5;
    context.beginPath();
    context.moveTo(826, 0);
    context.lineTo(826, 532);
    context.stroke();
    context.closePath();

    context.fillStyle = 'rgb(77, 56, 30)';
    context.fillRect(840, 100, 110, 372);

    context.lineWidth = 3;
    context.fillStyle = 'rgb(18, 219, 21)';
    context.fillRect(840, 10, 110, 30);
    context.strokeStyle = 'white';
    context.strokeRect(840, 10, 110, 30);
    this.text(context, 'upgrades', 845, 31, 20);

    // shop items
    // dart monkey
    // console.log(this.tower);
    context.strokeStyle = '#FFF01F';
    context.strokeRect(
      this.game.yellowBorder.x,
      this.game.yellowBorder.y,
      this.game.yellowBorder.w,
      this.game.yellowBorder.h
    );
    context.drawImage(
      document.querySelector('#dartmonkeyshop'),
      845,
      105,
      37 * 1.3,
      47 * 1.3
    );
    this.text(context, '$' + 170, 850, 165, 16);
    // boomerang monkey
    context.drawImage(
      document.querySelector('#boomerangmonkeyshop'),
      897,
      110,
      41 * 1.3,
      43 * 1.3
    );
    this.text(context, '$' + 275, 905, 165, 16);
    // playbuttons
    context.drawImage(document.querySelector('#playButton'), 897, 475, 47, 47);
  }
  text(context, text, x, y, fontSize) {
    context.font = fontSize + 'px ' + this.fontFamily;
    context.lineWidth = 1;
    context.fillStyle = 'white';
    context.fillText(text, x, y);
    context.strokeStyle = 'black';
    context.strokeText(text, x, y);
  }
  update() {}
}
