/* eslint-disable unicorn/no-array-reduce */
/* eslint-disable unicorn/no-null */
/* eslint-disable unicorn/prevent-abbreviations */
import {
  BlueBloon,
  RedBloon,
  GreenBloon,
  YellowBloon,
  PinkBloon
} from './bloon.js';
import { MonkeyMeadow } from './map.js';
import { UI } from './ui.js';
import { BoomerangMonkey000, DartMonkey000 } from './tower.js';
import { DartNormal, Boomerang000 } from './projectiles.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 960;
canvas.height = 532;
// const resize = () => {
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
// };
// window.addEventListener('resize', resize);

class Game {
  constructor(width, height, canvas) {
    this.canvas = canvas;
    this.width = width;
    this.height = height;
    this.bloons = [];
    this.projectiles = [];
    this.towers = [];
    this.newTower = null;
    this.map = new MonkeyMeadow();
    this.UI = new UI(this);
    this.roundFinished = true;
    this.autoplay = true;
    this.round = 0;
    this.health = 200;
    this.coins = 650;
    this.holding = false;
    this.frame = 0;
    this.bloonAdding = 1;
    this.playing = true;
    this.sendBloons = false; // this.bloons.push(new RedBloon(0, 170, 1, { camo: true }, 0));
    this.changed = false;
    this.did = 0;
    this.yellowBorder = { x: 0, y: 0, w: 0, h: 0 };
    this.bloonsSend = false;
    // mouse
    this.mouse = {
      x: 10,
      y: 10,
      mousedown: false,
      mouseup: true
    };
    this.canvas.addEventListener('mousemove', e => {
      this.mouse.x = e.offsetX;
      this.mouse.y = e.offsetY;
    });
    this.canvas.addEventListener('mousedown', () => {
      this.mouse.mousedown = true;
      this.mouse.mouseup = false;
    });
    this.canvas.addEventListener('mouseup', () => {
      this.mouse.mouseup = true;
      this.mouse.mousedown = false;
    });
    // document.addEventListener('visibilitychange', function () {
    //   this.playing = document.hidden ? false : true;
    // });

    this.canvas.addEventListener('click', () => {
      console.log('click');
      if (
        this.mouse.x > 897 &&
        this.mouse.x < 944 &&
        this.mouse.y > 475 &&
        this.mouse.y < 522 &&
        this.roundFinished
      ) {
        this.round += 1;
        this.sendBloons = true;
        this.roundFinished = false;
      }
      if (
        this.mouse.y > 5 &&
        this.mouse.y < 40 &&
        this.mouse.x > 840 &&
        this.mouse.x < 950
      ) {
        console.log('e');
      }
      if (this.UI.shopPage === 1) {
        if (
          this.mouse.y > 110 &&
          this.mouse.y < 171.1 &&
          this.mouse.x > 848 &&
          this.mouse.x < 893 &&
          this.coins >= 170 &&
          this.newTower === null
        ) {
          this.newTower = new DartMonkey000(
            this.mouse.x,
            this.mouse.y,
            this.canvas,
            this.mouse
          );
          this.holding = true;
          this.yellowBorder = { x: 845, y: 108, w: 37 * 1.3, h: 46 * 1.3 };
          this.coins -= 170;
        }
        if (
          this.mouse.y > 110 &&
          this.mouse.y < 171.1 &&
          this.mouse.x > 897 &&
          this.mouse.x < 950 &&
          this.coins >= 275 &&
          this.newTower === null
        ) {
          this.newTower = new BoomerangMonkey000(
            this.mouse.x,
            this.mouse.y,
            this.canvas,
            this.mouse
          );
          this.holding = true;
          this.yellowBorder = { x: 897, y: 110, w: 41 * 1.3, h: 43 * 1.3 };
          this.coins -= 275;
        }
      }
      if (
        this.mouse.x > 0 &&
        this.mouse.x < 840 &&
        this.mouse.y > 0 &&
        this.mouse.y < 532
      ) {
        for (const tower of this.towers) {
          tower.clicked =
            this.distanceTo(
              this.mouse.x,
              this.mouse.y,
              tower.x + tower.width / 2,
              tower.y + tower.height / 2
            ) < tower.width && this.newTower === null
              ? !tower.clicked
              : false;
        }
        if (
          this.newTower !== null &&
          this.mouse.x > 0 &&
          this.mouse.x < 840 - this.newTower.width &&
          this.mouse.y > 0 + this.newTower.height / 2 &&
          this.mouse.y < 532 &&
          this.collisionDetection(
            this.newTower.x + this.newTower.width / 2,
            this.newTower.y + this.newTower.height / 2,
            this.map
          ) &&
          this.holding === true
        ) {
          this.towers.push(this.newTower);
          this.newTower.dropped = true;
          this.holding = false;
          this.newTower = null;
        }
      }
    });
    this.canvas.addEventListener('contextmenu', e => {
      e.preventDefault();
      this.newTower = null;
    });
  }
  newRound() {
    this.coins += 100 + this.round;
    this.roundFinished = false;
    this.sendBloons = false;
  }
  update() {
    if (this.did === 0) {
      this.changed =
        this.bloons.length > 0 && this.bloonsSend === true ? true : false;
      if (this.changed) this.did = 1;
    }

    if (
      this.bloons.length <= 0 &&
      this.changed === true &&
      this.bloonsSend === true
    ) {
      this.roundFinished = true;
      this.changed = false;
      this.bloonsSend = false;
      this.did = 0;
    }
    if (this.round === 1 && this.sendBloons === true) {
      this.newRound();
      let bloonCounter = 0;
      const interval = setInterval(() => {
        if (bloonCounter === 20 - 1) {
          this.bloonsSend = true;
          clearInterval(interval);
        }
        this.bloons.push(
          new RedBloon(0, 170, 1, { camo: false, regrow: false }, 0)
        );
        bloonCounter += 1;
      }, (17.51 / 20) * 1000);
    }
    if (this.round === 2 && this.sendBloons === true) {
      this.newRound();
      let bloonCounter = 0;
      const interval = setInterval(() => {
        if (bloonCounter === 35 - 1) {
          this.bloonsSend = true;
          clearInterval(interval);
        }
        this.bloons.push(
          new RedBloon(0, 170, 1, { camo: false, regrow: false }, 0)
        );
        bloonCounter += 1;
      }, (19 / 35) * 1000);
    }
    if (this.round === 3 && this.sendBloons === true) {
      this.newRound();
      let bloonCounter = 0;
      const interval = setInterval(() => {
        if (bloonCounter === 10 - 1) {
          clearInterval(interval);
        }
        this.bloons.push(
          new RedBloon(0, 170, 1, { camo: false, regrow: false }, 0)
        );
        bloonCounter += 1;
      }, (5.1 / 10) * 1000);
      let bloonCounter2 = 0;
      const interval2 = setInterval(() => {
        if (bloonCounter2 === 18 - 1) {
          clearInterval(interval2);
        }
        if (bloonCounter2 > 12) {
          this.bloons.push(
            new BlueBloon(0, 170, 1, { camo: false, regrow: false }, 0)
          );
        }
        bloonCounter2 += 1;
      }, (7.95 / 18) * 1000);
      let bloonCounter3 = 0;
      const interval3 = setInterval(() => {
        if (bloonCounter3 === 36 - 1) {
          this.bloonsSend = true;
          clearInterval(interval3);
        }
        if (bloonCounter3 > 20) {
          this.bloons.push(
            new RedBloon(0, 170, 1, { camo: false, regrow: false }, 0)
          );
        }
        bloonCounter3 += 1;
      }, (16.71 / 36) * 1000);
    }
    if (this.round === 4 && this.sendBloons === true) {
      this.newRound();
      let bloonCounter = 0;
      const interval = setInterval(() => {
        if (bloonCounter === 25 - 1) {
          clearInterval(interval);
        }
        this.bloons.push(
          new RedBloon(0, 170, 1, { camo: false, regrow: false }, 0)
        );
        bloonCounter += 1;
      }, (12 / 25) * 1000);
      let bloonCounter2 = 0;
      const interval2 = setInterval(() => {
        if (bloonCounter2 === 104 - 1) {
          clearInterval(interval2);
        }
        if (bloonCounter2 > 85) {
          this.bloons.push(
            new BlueBloon(0, 170, 1, { camo: false, regrow: false }, 0)
          );
        }
        bloonCounter2 += 1;
      }, (14.5 / 104) * 1000);
      let bloonCounter3 = 0;
      const interval3 = setInterval(() => {
        if (bloonCounter3 === 62 - 1) {
          this.bloonsSend = true;
          clearInterval(interval3);
        }
        if (bloonCounter2 > 51) {
          this.bloons.push(
            new RedBloon(0, 170, 1, { camo: false, regrow: false }, 0)
          );
        }
        bloonCounter3 += 1;
      }, (17.3 / 62) * 1000);
    }
    if (this.round === 5 && this.sendBloons === true) {
      this.newRound();
      let bloonCounter = 0;
      const interval = setInterval(() => {
        if (bloonCounter === 12 - 1) {
          clearInterval(interval);
        }
        this.bloons.push(
          new BlueBloon(0, 170, 1, { camo: false, regrow: false }, 0)
        );
        bloonCounter += 1;
      }, (5.14 / 12) * 1000);
      let bloonCounter2 = 0;
      const interval2 = setInterval(() => {
        if (bloonCounter2 === 16 - 1) {
          clearInterval(interval2);
        }
        if (bloonCounter2 > 10) {
          this.bloons.push(
            new RedBloon(0, 170, 1, { camo: false, regrow: false }, 0)
          );
        }
        bloonCounter2 += 1;
      }, (7.3 / 16) * 1000);
      let bloonCounter3 = 0;
      const interval3 = setInterval(() => {
        if (bloonCounter3 === 31 - 1) {
          this.bloonsSend = true;
          clearInterval(interval3);
        }
        if (bloonCounter2 > 15) {
          this.bloons.push(
            new BlueBloon(0, 170, 1, { camo: false, regrow: false }, 0)
          );
        }
        bloonCounter3 += 1;
      }, (16.5 / 31) * 1000);
    }
    if (this.round === 6 && this.sendBloons === true) {
      this.newRound();
      let bloonCounter = 0;
      const interval = setInterval(() => {
        if (bloonCounter === 4 - 1) {
          clearInterval(interval);
        }
        this.bloons.push(
          new GreenBloon(0, 170, 1, { camo: false, regrow: false }, 0)
        );
        bloonCounter += 1;
      }, (1.71 / 4) * 1000);
      let bloonCounter2 = 0;
      const interval2 = setInterval(() => {
        if (bloonCounter2 === 15 - 1) {
          clearInterval(interval2);
        }
        this.bloons.push(
          new RedBloon(0, 170, 1, { camo: false, regrow: false }, 0)
        );
        bloonCounter2 += 1;
      }, (5 / 15) * 1000);
      let bloonCounter3 = 0;
      const interval3 = setInterval(() => {
        if (bloonCounter3 === 15 - 1) {
          this.bloonsSend = true;
          clearInterval(interval3);
        }
        this.bloons.push(
          new BlueBloon(0, 170, 1, { camo: false, regrow: false }, 0)
        );
        bloonCounter3 += 1;
      }, (7.9 / 15) * 1000);
    }
    if (this.round === 7 && this.sendBloons === true) {
      this.newRound();
      let bloonCounter = 0;
      const interval = setInterval(() => {
        if (bloonCounter === 10 - 1) {
          clearInterval(interval);
        }
        this.bloons.push(
          new BlueBloon(0, 170, 1, { camo: false, regrow: false }, 0)
        );
        bloonCounter += 1;
      }, (5.14 / 10) * 1000);
      let bloonCounter2 = 0;
      const interval2 = setInterval(() => {
        if (bloonCounter2 === 11 - 1) {
          clearInterval(interval2);
        }
        if (bloonCounter2 > 10) {
          this.bloons.push(
            new GreenBloon(0, 170, 1, { camo: false, regrow: false }, 0)
          );
        }
        bloonCounter2 += 1;
      }, (10.65 / 11) * 1000);
      let bloonCounter3 = 0;
      const interval3 = setInterval(() => {
        if (bloonCounter3 === 20 - 1) {
          clearInterval(interval3);
        }
        this.bloons.push(
          new RedBloon(0, 170, 1, { camo: false, regrow: false }, 0)
        );
        bloonCounter3 += 1;
      }, (10.8 / 20) * 1000);
      let bloonCounter4 = 0;
      const interval4 = setInterval(() => {
        if (bloonCounter4 === 12 - 1) {
          this.bloonsSend = true;
          clearInterval(interval4);
        }
        this.bloons.push(
          new BlueBloon(0, 170, 1, { camo: false, regrow: false }, 0)
        );
        bloonCounter4 += 1;
      }, (3.99 / 12) * 1000);
    }
    if (this.round === 8 && this.sendBloons === true) {
      this.newRound();
      let bloonCounter = 0;
      const interval = setInterval(() => {
        if (bloonCounter === 20 - 1) {
          clearInterval(interval);
        }
        this.bloons.push(
          new BlueBloon(0, 170, 1, { camo: false, regrow: false }, 0)
        );
        bloonCounter += 1;
      }, (10.84 / 20) * 1000);
      let bloonCounter2 = 0;
      const interval2 = setInterval(() => {
        if (bloonCounter2 === 2 - 1) {
          clearInterval(interval2);
        }
        this.bloons.push(
          new GreenBloon(0, 170, 1, { camo: false, regrow: false }, 0)
        );
        bloonCounter2 += 1;
      }, (0.57 / 2) * 1000);
      let bloonCounter3 = 0;
      const interval3 = setInterval(() => {
        if (bloonCounter3 === 10 - 1) {
          clearInterval(interval3);
        }
        this.bloons.push(
          new RedBloon(0, 170, 1, { camo: false, regrow: false }, 0)
        );
        bloonCounter3 += 1;
      }, (1.9 / 10) * 1000);
      let bloonCounter4 = 0;
      const interval4 = setInterval(() => {
        if (bloonCounter4 === 12 - 1) {
          this.bloonsSend = true;
          clearInterval(interval4);
        }
        this.bloons.push(
          new GreenBloon(0, 170, 3, { camo: false, regrow: false }, 0)
        );
        bloonCounter4 += 1;
      }, (9.4 / 12) * 1000);
    }
    if (this.round === 9 && this.sendBloons === true) {
      this.newRound();
      let bloonCounter = 0;
      const interval = setInterval(() => {
        if (bloonCounter === 30 - 1) {
          this.bloonsSend = true;
          clearInterval(interval);
        }
        this.bloons.push(
          new GreenBloon(0, 170, 3, { camo: false, regrow: false }, 0)
        );
        bloonCounter += 1;
      }, (18.95 / 30) * 1000);
    }
    if (this.round === 10 && this.sendBloons === true) {
      this.newRound();
      let bloonCounter = 0;
      const interval = setInterval(() => {
        if (bloonCounter === 102 - 1) {
          this.bloonsSend = true;
          clearInterval(interval);
        }
        this.bloons.push(
          new BlueBloon(0, 170, 2, { camo: false, regrow: false }, 0)
        );
        bloonCounter += 1;
      }, (48 / 102) * 1000);
    }

    if (this.round === 11 && this.sendBloons === true) {
      this.newRound();
      let bloonCounter = 0;
      const interval = setInterval(() => {
        if (bloonCounter === 3 - 1) {
          clearInterval(interval);
        }
        this.bloons.push(
          new YellowBloon(0, 170, 1, { camo: false, regrow: false }, 0)
        );
        bloonCounter += 1;
      }, (1 / 3) * 1000);
      let bloonCounter2 = 0;
      const interval2 = setInterval(() => {
        if (bloonCounter2 === 12 - 1) {
          clearInterval(interval2);
        }
        this.bloons.push(
          new GreenBloon(0, 170, 1, { camo: false, regrow: false }, 0)
        );
        bloonCounter2 += 1;
      }, (6.3 / 12) * 1000);
      let bloonCounter3 = 0;
      const interval3 = setInterval(() => {
        if (bloonCounter3 === 10 - 1) {
          clearInterval(interval3);
        }
        this.bloons.push(
          new BlueBloon(0, 170, 1, { camo: false, regrow: false }, 0)
        );
        bloonCounter3 += 1;
      }, (3.9 / 10) * 1000);
      let bloonCounter4 = 0;
      const interval4 = setInterval(() => {
        if (bloonCounter4 === 10 - 1) {
          this.bloonsSend = true;
          clearInterval(interval4);
        }
        this.bloons.push(
          new RedBloon(0, 170, 1, { camo: false, regrow: false }, 0)
        );
        bloonCounter4 += 1;
      }, (4.6 / 10) * 1000);
    }
    if (this.bloons.length > 0) {
      for (const [index, bloon] of this.bloons.entries()) {
        bloon.update(this.map);
        if (bloon.waypointIndex === this.map.waypoints.length - 1) {
          this.health -= bloon.health;
          this.bloons.splice(index, 1);
        }

        if (bloon.health <= 0) {
          this.coins += bloon.ohealth;
          this.bloons.splice(index, 1);
        }
        if (bloon.health === 1 && bloon.ohealth !== 1) {
          this.bloons.push(
            new RedBloon(
              bloon.x,
              bloon.y,
              1,
              { camo: false },
              bloon.waypointIndex
            )
          );
          this.bloons.splice(index, 1);
        }
        if (bloon.health === 2 && bloon.ohealth !== 2) {
          this.bloons.push(
            new BlueBloon(
              bloon.x,
              bloon.y,
              1,
              { camo: false },
              bloon.waypointIndex
            )
          );
          this.bloons.splice(index, 1);
        }
        if (bloon.health === 3 && bloon.ohealth !== 3) {
          this.bloons.push(
            new GreenBloon(
              bloon.x,
              bloon.y,
              1,
              { camo: false },
              bloon.waypointIndex
            )
          );
          this.bloons.splice(index, 1);
        }
        if (bloon.health === 4 && bloon.ohealth !== 4) {
          this.bloons.push(
            new YellowBloon(
              bloon.x,
              bloon.y,
              1,
              { camo: false },
              bloon.waypointIndex
            )
          );
          this.bloons.splice(index, 1);
        }
        if (bloon.health === 5 && bloon.ohealth !== 5) {
          this.bloons.push(
            new PinkBloon(
              bloon.x,
              bloon.y,
              1,
              { camo: false },
              bloon.waypointIndex
            )
          );
          this.bloons.splice(index, 1);
        }
      }
    }

    if (this.newTower !== null) {
      this.newTower.update(this.mouse);
      if (
        this.collisionDetection(
          this.newTower.x + this.newTower.width / 2,
          this.newTower.y + this.newTower.height / 2,
          this.map
        )
      ) {
        this.newTower.canplace = true;
      } else if (
        !this.collisionDetection(
          this.newTower.x + this.newTower.width / 2,
          this.newTower.y + this.newTower.height / 2,
          this.map
        )
      ) {
        this.newTower.canplace = false;
      }
    }

    for (const [index, tower] of this.towers.entries()) {
      tower.update(this.bloons);
    }
    for (const [index, projectile] of this.projectiles.entries()) {
      projectile.update(this.bloons);
      if (
        ((projectile.x > this.width ||
          projectile.x < 0 ||
          projectile.y > this.height ||
          projectile.y < 0) &&
          projectile.type == 'normal') ||
        (projectile.type == 'boomerang' && projectile.deg > 6)
      ) {
        this.projectiles.splice(index, 1);
      }
      if (this.bloons.length > 0) {
        for (const [bindex, bloon] of this.bloons.entries()) {
          if (
            projectile.bindexhit !== bindex &&
            this.distanceTo(projectile.x, projectile.y, bloon.x, bloon.y) <
              bloon.width
          ) {
            if (projectile.pierce > 0) {
              projectile.pierce -= 1;
            } else {
              this.projectiles.splice(index, 1);
            }
            if (bloon.health !== 1) {
              projectile.bindexhit = bindex;
            }
            if (bloon.health !== 0) {
              bloon.health -= 1;
            } else {
              this.coins += bloon.ohealth;
              this.bloons.splice(bindex, 1);
            }
          }
        }
      }
    }
    this.UI.update();
  }
  canAttack(bloon, tower) {
    return (
      (bloon.type.camo && !tower.attackType.camo) ||
      (bloon.bloonType == 'purple' && !tower.attackType.purple) ||
      (bloon.bloonType == 'lead' && !tower.attackType.lead)
    );
  }
  draw(context) {
    this.map.draw(context);
    for (const bloon of this.bloons) {
      bloon.draw(context);
    }
    if (this.bloons.length > 0) {
      for (const tower of this.towers) {
        const bloonindex = this.closest(tower);
        const bloonX =
          this.bloons[bloonindex].x - this.bloons[bloonindex].width / 2;
        const bloonY =
          this.bloons[bloonindex].y + this.bloons[bloonindex].height / 2;
        if (
          !this.canAttack(this.bloons[bloonindex], tower) &&
          this.distanceTo(
            tower.x + tower.width / 2,
            tower.y - tower.height / 2,
            bloonX,
            bloonY
          ) <=
            tower.range - this.bloons[bloonindex].width / 2
        ) {
          tower.rotate(
            context,
            this.pointTo(
              tower.x + tower.width / 2,
              tower.y + tower.height / 2,
              bloonX,
              bloonY
            )
          );
        } else {
          tower.rotate(context, tower.rotation);
        }
        if (
          tower.type === 'DartMonkey000' &&
          this.frame % 47 === 0 &&
          this.distanceTo(tower.x, tower.y, bloonX, bloonY) <= tower.range
        ) {
          if (this.canAttack(this.bloons[bloonindex], tower)) {
            return;
          } else {
            this.projectiles.push(
              new DartNormal(
                tower.x,
                tower.y,
                this.pointTo(
                  tower.x + tower.width / 2,
                  tower.y + tower.height / 2,
                  bloonX,
                  bloonY
                ),
                game
              )
            );
          }
        }
        if (tower.type === 'BoomerangMonkey000') {
          if (
            this.frame % 60 === 0 &&
            this.distanceTo(tower.x, tower.y, bloonX, bloonY) <= tower.range
          ) {
            if (this.canAttack(this.bloons[bloonindex], tower)) {
              return;
            } else {
              this.projectiles.push(
                new Boomerang000(
                  tower.x,
                  tower.y,
                  this.pointTo(
                    tower.x + tower.width / 2,
                    tower.y + tower.height / 2,
                    bloonX,
                    bloonY
                  ),
                  game,
                  bloonX,
                  bloonY
                )
              );
            }
          }
        } else {
          //bing
        }
        tower.draw(context);
        this.reset(context);
      }
    } else {
      for (const tower of this.towers) {
        tower.draw(context);
        this.reset(context);
      }
    }
    for (const projectile of this.projectiles) {
      if (this.bloons.length > 0 && projectile.pointed === false) {
        const bloonindex = this.closest(projectile);
        const bloonX = this.bloons[bloonindex].x;
        const bloonY = this.bloons[bloonindex].y;
        projectile.rotate(
          context,
          this.pointTo(projectile.x, projectile.y, bloonX, bloonY)
        );
        projectile.draw(context);
        this.reset(context);
        projectile.pointed = true;
      } else {
        projectile.rotate(context, projectile.rotation);
        projectile.draw(context);
        this.reset(context);
      }
    }
    this.UI.draw(context);
    this.newTower !== null && this.newTower.draw(context);
  }
  closest(tower) {
    let number = 0;
    for (const [index, bloon] of this.bloons.entries()) {
      if (
        this.distanceTo(
          tower.x,
          tower.y,
          this.bloons[number].x,
          this.bloons[number].y
        ) > this.distanceTo(tower.x, tower.y, bloon.x, bloon.y)
      ) {
        number += 1;
      }
    }
    return number;
  }
  first() {}
  last() {}
  strong() {}
  collisionDetection(x1, y1, map) {
    let collisions = 0;
    for (let i = 0; i < map.collisionPoints.length; i++) {
      if (
        !(
          this.distanceTo(
            map.collisionPoints[i].x,
            map.collisionPoints[i].y,
            x1,
            y1
          ) < this.newTower.width
        )
      ) {
        collisions += 1;
      }
    }
    for (let i = 0; i < this.towers.length; i++) {
      if (
        !(
          this.distanceTo(this.towers[i].x, this.towers[i].y, x1, y1) <
          this.newTower.height
        )
      ) {
        collisions += 1;
      }
    }
    if (collisions === map.collisionPoints.length + this.towers.length) {
      return true;
    }
  }
  reset(context) {
    context.resetTransform();
  }
  distanceTo(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  }
  pointTo(x1, y1, x2, y2) {
    return (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
  }
}

const game = new Game(canvas.width, canvas.height, canvas);

function animate() {
  // if (game.playing) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  game.update(ctx);
  game.draw(ctx);
  game.frame += 1;
  requestAnimationFrame(animate);
  // }
}

animate();
