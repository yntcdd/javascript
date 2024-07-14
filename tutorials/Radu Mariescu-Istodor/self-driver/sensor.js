/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable no-undef */
class Sensor {
  constructor(car) {
    this.car = car;
    this.rayCount = 5;
    this.rayLength = 150;
    this.raySpread = Math.PI / 2;

    this.rays = [];
    this.readings = [];
  }

  update(roadBorders, traffic) {
    this.#castRays();
    this.readings = [];
    for (let index = 0; index < this.rays.length; index++) {
      this.readings.push(
        this.#getReading(this.rays[index], roadBorders, traffic)
      );
    }
  }

  #getReading(ray, roadBorders, traffic) {
    const touches = [];

    for (const roadBorder of roadBorders) {
      const touch = getIntersection(
        ray[0],
        ray[1],
        roadBorder[0],
        roadBorder[1]
      );
      if (touch) {
        touches.push(touch);
      }
    }

    for (const element of traffic) {
      const poly = element.polygon;
      for (let index = 0; index < poly.length; index++) {
        const value = getIntersection(
          ray[0],
          ray[1],
          poly[index],
          poly[(index + 1) % poly.length]
        );
        if (value) {
          touches.push(value);
        }
      }
    }

    if (touches.length === 0) {
      // eslint-disable-next-line unicorn/no-null
      return null;
    } else {
      const offsets = touches.map(e => e.offset);
      const minOffset = Math.min(...offsets);
      return touches.find(e => e.offset == minOffset);
    }
  }

  #castRays() {
    this.rays = [];
    for (let index = 0; index < this.rayCount; index++) {
      const rayAngle =
        lerp(
          this.raySpread / 2,
          -this.raySpread / 2,
          this.rayCount == 1 ? 0.5 : index / (this.rayCount - 1)
        ) + this.car.angle;

      const start = { x: this.car.x, y: this.car.y };
      const end = {
        x: this.car.x - Math.sin(rayAngle) * this.rayLength,
        y: this.car.y - Math.cos(rayAngle) * this.rayLength
      };
      this.rays.push([start, end]);
    }
  }

  draw(context) {
    for (let index = 0; index < this.rayCount; index++) {
      let end = this.rays[index][1];
      if (this.readings[index]) {
        end = this.readings[index];
      }

      context.beginPath();
      context.lineWidth = 2;
      context.strokeStyle = 'yellow';
      context.moveTo(this.rays[index][0].x, this.rays[index][0].y);
      context.lineTo(end.x, end.y);
      context.stroke();

      context.beginPath();
      context.lineWidth = 2;
      context.strokeStyle = 'black';
      context.moveTo(this.rays[index][1].x, this.rays[index][1].y);
      context.lineTo(end.x, end.y);
      context.stroke();
    }
  }
}
