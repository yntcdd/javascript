export class MonkeyMeadow {
  constructor() {
    this.image = document.querySelector('#monkeyMeadow');

    this.waypoints = [
      {
        x: 410,
        y: 190
      },
      {
        x: 410,
        y: 70
      },
      {
        x: 270,
        y: 70
      },
      {
        x: 270,
        y: 400
      },
      {
        x: 140,
        y: 400
      },
      {
        x: 130,
        y: 290
      },
      {
        x: 530,
        y: 290
      },
      {
        x: 530,
        y: 150
      },
      {
        x: 610,
        y: 150
      },
      {
        x: 630,
        y: 370
      },
      {
        x: 370,
        y: 370
      },
      {
        x: 370,
        y: 532
      },
      {
        x: 0,
        y: 0
      }
    ];
    this.pathLength = 11;

    this.collisionPoints = [
      {
        x: 20,
        y: 220
      },
      {
        x: 60,
        y: 220
      },
      {
        x: 100,
        y: 220
      },
      {
        x: 140,
        y: 220
      },
      {
        x: 180,
        y: 220
      },
      {
        x: 220,
        y: 220
      },
      {
        x: 260,
        y: 220
      },
      {
        x: 300,
        y: 220
      },
      {
        x: 340,
        y: 220
      },
      {
        x: 380,
        y: 220
      },
      {
        x: 400,
        y: 220
      },
      {
        x: 410,
        y: 180
      },
      {
        x: 410,
        y: 140
      },
      {
        x: 360,
        y: 100
      },
      {
        x: 400,
        y: 100
      },
      {
        x: 320,
        y: 100
      },
      {
        x: 280,
        y: 100
      },
      {
        x: 270,
        y: 140
      },
      {
        x: 270,
        y: 180
      },
      {
        x: 270,
        y: 220
      },
      {
        x: 270,
        y: 260
      },
      {
        x: 270,
        y: 220
      },
      {
        x: 270,
        y: 180
      },
      {
        x: 270,
        y: 220
      },
      {
        x: 270,
        y: 260
      },
      {
        x: 270,
        y: 300
      },
      {
        x: 270,
        y: 340
      },
      {
        x: 270,
        y: 380
      },
      {
        x: 270,
        y: 420
      },
      {
        x: 230,
        y: 430
      },
      {
        x: 190,
        y: 430
      },
      {
        x: 135,
        y: 410
      },
      {
        x: 135,
        y: 370
      },
      {
        x: 135,
        y: 330
      },
      {
        x: 175,
        y: 310
      },
      {
        x: 215,
        y: 310
      },
      {
        x: 310,
        y: 310
      },
      {
        x: 350,
        y: 310
      },
      {
        x: 390,
        y: 310
      },
      {
        x: 430,
        y: 310
      },
      {
        x: 470,
        y: 310
      },
      {
        x: 510,
        y: 300
      },
      {
        x: 520,
        y: 260
      },
      {
        x: 525,
        y: 220
      },
      {
        x: 525,
        y: 180
      },
      {
        x: 565,
        y: 180
      },
      {
        x: 620,
        y: 220
      },
      {
        x: 605,
        y: 180
      },
      {
        x: 620,
        y: 260
      },
      {
        x: 620,
        y: 300
      },
      {
        x: 620,
        y: 340
      },
      {
        x: 610,
        y: 380
      },
      {
        x: 570,
        y: 385
      },
      {
        x: 530,
        y: 385
      },
      {
        x: 490,
        y: 385
      },
      {
        x: 450,
        y: 385
      },
      {
        x: 410,
        y: 385
      },
      {
        x: 370,
        y: 400
      },
      {
        x: 370,
        y: 440
      },
      {
        x: 370,
        y: 480
      },
      {
        x: 370,
        y: 520
      }
    ];
  }
  draw(context) {
    context.drawImage(this.image, 0, 0);
    // for (let index = 0; index < this.collisionPoints.length; index++) {
    //   context.beginPath();
    //   context.arc(
    //     this.collisionPoints[index].x,
    //     this.collisionPoints[index].y,
    //     20,
    //     0,
    //     2 * Math.PI,
    //     false
    //   );
    //   context.fillStyle = '#FF0000';
    //   context.fill();
    // }
  }
}
