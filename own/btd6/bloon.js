/* eslint-disable unicorn/no-null */
class Bloon {
  constructor(x, y, startingIndex) {
    this.image = null;
    this.width = null;
    this.height = null;
    this.health = null;
    this.x = x;
    this.y = y;
    this.waypointIndex = startingIndex;
    this.center = {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2
    };
    this.radius = 50;
    this.velocity = {
      x: 0,
      y: 0
    };
  }
  draw(context) {
    if (!this.type.camo)
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
    else if (this.type.camo)
      context.drawImage(
        this.camoImage,
        this.x,
        this.y,
        this.camoWidth,
        this.camoHeight
      );
  }
  update(map) {
    const waypoint = map.waypoints[this.waypointIndex];
    const yDistance = waypoint.y - this.center.y;
    const xDistance = waypoint.x - this.center.x;
    const angle = Math.atan2(yDistance, xDistance);

    this.velocity.x = Math.cos(angle) * this.speed;
    this.velocity.y = Math.sin(angle) * this.speed;

    this.x += this.velocity.x;
    this.y += this.velocity.y;

    if (!this.type.camo) {
      this.center = {
        x: this.x + this.width / 2,
        y: this.y + this.height / 2
      };
    } else if (this.type.camo) {
      this.center = {
        x: this.x + this.camoWidth / 2,
        y: this.y + this.camoHeight / 2
      };
    }

    if (
      Math.abs(Math.round(this.center.x) - Math.round(waypoint.x)) <
        Math.abs(this.velocity.x) &&
      Math.abs(Math.round(this.center.y) - Math.round(waypoint.y)) <
        Math.abs(this.velocity.y) &&
      this.waypointIndex < map.waypoints.length - 1
    ) {
      this.waypointIndex += 1;
    }
  }
}
export class RedBloon extends Bloon {
  constructor(x, y, health, type, startingIndex) {
    super(x, y, startingIndex);
    // console.log(startingIndex);
    // this.startingIndex = startingIndex;
    this.type = type;
    this.bloonType = 'normal';
    if (!this.type.camo && !this.type.regrow) {
      this.width = 49 / 1.2;
      this.height = 63 / 1.2;
      this.image = document.querySelector('#redBloon');
    } else if (this.type.camo) {
      this.camoWidth = 57 / 1.2;
      this.camoHeight = 71 / 1.2;
      this.camoImage = document.querySelector('#camoRedBloon');
    } else if (this.type.regrow) {
      this.regrowWidth = 73 / 1.2;
      this.regrowHeight = 68 / 1.2;
      this.regrowImage = document.querySelector('#regrowBlueBloon');
    }
    this.speed = 2;
    this.health = health;
    this.ohealth = health;
    // console.log(this.health);
    // console.log('redBloon', this.type);
  }
}

export class BlueBloon extends Bloon {
  constructor(x, y, health, type, startingIndex) {
    super(x, y, startingIndex);
    this.width = 53 / 1.2;
    this.height = 68 / 1.2;
    this.image = document.querySelector('#blueBloon');
    this.speed = 2 * 1.4;
    this.health = health;
    this.ohealth = health;
    // console.log(this.health);
    this.type = type;
    // console.log('redBloon', this.type);
  }
}

export class GreenBloon extends Bloon {
  constructor(x, y, health, type, startingIndex) {
    super(x, y, startingIndex);
    this.width = 53 / 1.2;
    this.height = 68 / 1.2;
    this.image = document.querySelector('#greenBloon');
    this.speed = 2 * 1.8;
    this.health = health;
    this.ohealth = health;
    // console.log(this.health);
    this.type = type;
    // console.log('redBloon', this.type);
  }
}

export class YellowBloon extends Bloon {
  constructor(x, y, health, type, startingIndex) {
    super(x, y, startingIndex);
    this.width = 53 / 1.2;
    this.height = 68 / 1.2;
    this.image = document.querySelector('#yellowBloon');
    this.speed = 2 * 3.2;
    this.health = health;
    this.ohealth = health;
    // console.log(this.health);
    this.type = type;
    // console.log('redBloon', this.type);
  }
}

export class PinkBloon extends Bloon {
  constructor(x, y, health, type, startingIndex) {
    super(x, y, startingIndex);
    this.width = 53 / 1.2;
    this.height = 68 / 1.2;
    this.image = document.querySelector('#pinkBloon');
    this.speed = 2 * 3.5;
    this.health = health;
    this.ohealth = health;
    // console.log(this.health);
    this.type = type;
    // console.log('redBloon', this.type);
  }
}

export class BlackBloon extends Bloon {
  constructor(x, y, health, type, startingIndex) {
    super(x, y, startingIndex);
    this.width = 53 / 1.2;
    this.height = 68 / 1.2;
    this.image = document.querySelector('#blackBloon');
    this.speed = 2 * 1.8;
    this.health = health;
    this.ohealth = health;
    // console.log(this.health);
    this.type = type;
    // console.log('redBloon', this.type);
  }
}

export class WhiteBloon extends Bloon {
  constructor(x, y, health, type, startingIndex) {
    super(x, y, startingIndex);
    this.width = 53 / 1.2;
    this.height = 68 / 1.2;
    this.image = document.querySelector('#whiteBloon');
    this.speed = 2 * 2;
    this.health = health;
    this.ohealth = health;
    // console.log(this.health);
    this.type = type;
    // console.log('redBloon', this.type);
  }
}
