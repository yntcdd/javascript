class Shape {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  area() {
    return this.width * this.height;
  }
  perimetre() {
    return this.width * 2 + this.height * 2;
  }
}

const rect = new Shape(100, 100, 200, 100);
const square = new Shape(50, 50, 50, 50);
console.log(rect.area());
console.log(rect.perimetre());
console.log(square.area());
console.log(square.perimetre());
