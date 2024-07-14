/* eslint-disable no-undef */
const carCanvas = document.querySelector('#carCanvas');
carCanvas.width = 200;
const networkCanvas = document.querySelector('#networkCanvas');
networkCanvas.width = 300;

const carContext = carCanvas.getContext('2d');
const networkContext = networkCanvas.getContext('2d');

const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);

const N = 1000;
const cars = generateCars(N);
let bestCar = cars[0];
if (localStorage.getItem('bestBrain')) {
  for (const [index, car] of cars.entries()) {
    car.brain = JSON.parse(localStorage.getItem('bestBrain'));
    if (index != 0) {
      NeuralNetwork.mutate(car.brain, 0.1);
    }
  }
}

const traffic = [
  new Car(road.getLaneCenter(1), -100, 30, 50, 'DUMMY', 2, getRandomColor()),
  new Car(road.getLaneCenter(0), -300, 30, 50, 'DUMMY', 2, getRandomColor()),
  new Car(road.getLaneCenter(2), -300, 30, 50, 'DUMMY', 2, getRandomColor()),
  new Car(road.getLaneCenter(0), -500, 30, 50, 'DUMMY', 2, getRandomColor()),
  new Car(road.getLaneCenter(1), -500, 30, 50, 'DUMMY', 2, getRandomColor()),
  new Car(road.getLaneCenter(1), -700, 30, 50, 'DUMMY', 2, getRandomColor()),
  new Car(road.getLaneCenter(2), -700, 30, 50, 'DUMMY', 2, getRandomColor())
];

animate();

function save() {
  localStorage.setItem('bestBrain', JSON.stringify(bestCar.brain));
}

function discard() {
  localStorage.removeItem('bestBrain');
}

function generateCars(N) {
  const cars = [];
  for (let index = 1; index <= N; index++) {
    cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, 'AI'));
  }
  return cars;
}

function animate(time) {
  for (const element of traffic) {
    element.update(road.borders, []);
  }
  for (const car of cars) {
    car.update(road.borders, traffic);
  }
  bestCar = cars.find(c => c.y == Math.min(...cars.map(c => c.y)));

  carCanvas.height = window.innerHeight;
  networkCanvas.height = window.innerHeight;

  carContext.save();
  carContext.translate(0, -bestCar.y + carCanvas.height * 0.7);

  road.draw(carContext);
  for (const element of traffic) {
    element.draw(carContext);
  }
  carContext.globalAlpha = 0.2;
  for (const car of cars) {
    car.draw(carContext);
  }
  carContext.globalAlpha = 1;
  bestCar.draw(carContext, true);

  carContext.restore();

  networkContext.lineDashOffset = -time / 50;
  Visualizer.drawNetwork(networkContext, bestCar.brain);
  requestAnimationFrame(animate);
}
