/* eslint-disable no-undef */
class Road {
  constructor(x, width, laneCount = 3) {
    this.x = x;
    this.width = width;
    this.laneCount = laneCount;

    this.left = x - width / 2;
    this.right = x + width / 2;

    const infinity = 1_000_000;
    this.top = -infinity;
    this.bottom = infinity;

    const topLeft = { x: this.left, y: this.top };
    const topRight = { x: this.right, y: this.top };
    const bottomLeft = { x: this.left, y: this.bottom };
    const bottomRight = { x: this.right, y: this.bottom };
    this.borders = [
      [topLeft, bottomLeft],
      [topRight, bottomRight]
    ];
  }

  getLaneCenter(laneIndex) {
    const laneWidth = this.width / this.laneCount;
    return (
      this.left +
      laneWidth / 2 +
      Math.min(laneIndex, this.laneCount - 1) * laneWidth
    );
  }

  draw(context) {
    context.lineWidth = 5;
    context.strokeStyle = 'white';

    for (let index = 1; index <= this.laneCount - 1; index++) {
      const x = lerp(this.left, this.right, index / this.laneCount);

      context.setLineDash([20, 20]);
      context.beginPath();
      context.moveTo(x, this.top);
      context.lineTo(x, this.bottom);
      context.stroke();
    }

    context.setLineDash([]);
    for (const border of this.borders) {
      context.beginPath();
      context.moveTo(border[0].x, border[0].y);
      context.lineTo(border[1].x, border[1].y);
      context.stroke();
    }
  }
}
