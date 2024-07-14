/* eslint-disable no-unused-vars */
const canvas = document.querySelector('#canvas1');
const context1 = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 600;

const canvas2 = document.querySelector('#canvas2');
const context2 = canvas2.getContext('2d');
canvas2.width = 600;
canvas2.height = 600;

const canvas3 = document.querySelector('#canvas3');
const context3 = canvas3.getContext('2d');
canvas3.width = 600;
canvas3.height = 600;

const canvas4 = document.querySelector('#canvas4');
const context4 = canvas4.getContext('2d');
canvas4.width = 600;
canvas4.height = 600;

const canvas5 = document.querySelector('#canvas5');
const context5 = canvas5.getContext('2d');
canvas5.width = 600;
canvas5.height = 600;

// global varibles
const grid = 80;
let keys = [];
let score = 0;
let collisionsCount = 0;
let frame = 0;
let gameSpeed = 1;
let safe = false;

const particlesArray = [];
const maxParticles = 300;
const ripplesArray = [];
const carsArray = [];
const logsArray = [];

// images
const background_lvl2 = new Image();
background_lvl2.src = 'background_lvl2.png';

const grass = new Image();
grass.src = 'grass.png';

const collisions = new Image();
collisions.src = 'collisions.png';

const turtle = new Image();
turtle.src = 'turtles.png';

const log = new Image();
log.src = 'log.png';

const car = new Image();
car.src = 'cars.png';
let numberOfCars = 3;

const froggerSprite = new Image();
froggerSprite.src = 'frog_spritesheet.png';
