/* eslint-disable no-unused-vars */
let game = {
  score: 0,
  totalScore: 0,
  totalClicks: 0,
  clickValue: 1,
  version: 0,

  addToScore: function (amount) {
    this.score += amount;
    this.totalScore += amount;
    display.updateScore();
  },

  getScorePerSecond: function () {
    let scorePerSecond = 0;
    for (let index = 0; index < building.name.length; index++) {
      scorePerSecond += building.income[index] * building.count[index];
    }
    return scorePerSecond;
  }
};

var building = {
  name: ['Cursor', 'Grandma', 'Oven', 'Factory'],
  image: ['cursor.png', 'grandma.png', 'oven.png', 'factory.png'],
  count: [0, 0, 0, 0],
  income: [1, 15, 155, 1555],
  cost: [100, 1000, 10_000, 100_000],

  purchase: function (index) {
    if (game.score >= this.cost[index]) {
      game.score -= this.cost[index];
      this.count[index] += 1;
      this.cost[index] = Math.ceil(this.cost[index] * 1.1);
      display.updateScore();
      display.updateShop();
      display.updateUpgrades;
    }
  }
};

let upgrade = {
  name: ['Stone Fingers', 'Iron Fingers', 'Stone Clicker'],
  description: [
    'Cursors are twice as efficient',
    'Cursors are twice as efficient',
    'The mouse is twice as efficent'
  ],
  image: ['cursor.png', 'cursor.png', 'cursor.png'],
  type: ['building', 'building', 'click'],
  cost: [300, 500, 300],
  buildingIndex: [0, 0, -1],
  requirement: [1, 5, 1],
  bonus: [2, 2, 2],
  purchased: [false, false, false],

  purchase: function (index) {
    if (!this.purchased[index] && game.score >= this.cost[index]) {
      if (
        this.type[index] == 'building' &&
        building.count[this.buildingIndex[index]] >= this.requirement[index]
      ) {
        game.score -= this.cost[index];
        building.income[this.buildingIndex[index]] *= this.bonus[index];
        this.purchased[index] = true;

        display.updateUpgrades();
        display.updateShop();
      } else if (
        this.type[index] == 'click' &&
        game.totalClicks >= this.requirement[index]
      ) {
        game.score -= this.cost[index];
        game.clickValue *= this.bonus[index];
        this.purchased[index] = true;

        display.updateUpgrades();
        display.updateShop();
      }
    }
  }
};

let achievement = {
  name: ['Stone Fingers', 'A humble Start', 'Fingertastic'],
  description: ['Buy 1 cursor', 'Gather 1 salsa', 'Click the salsa 1 time'],
  image: ['cursor.png', 'salsa.png', 'cursor.png'],
  type: ['building', 'score', 'click'],
  requirement: [1, 1, 1],
  objectIndex: [0, -1, -1],
  awarded: [false, false, false],

  earn: function (index) {
    this.awarded[index] = true;
  }
};

let display = {
  updateScore: function () {
    document.querySelector('#score').innerHTML = game.score;
    document.querySelector('#scorepersecond').innerHTML =
      game.getScorePerSecond();
    document.title = game.score + ' salsa - Salsa Clicker';
  },

  updateShop: function () {
    document.querySelector('#shopContainer').innerHTML = '';
    for (let index = 0; index < building.name.length; index++) {
      document.querySelector('#shopContainer').innerHTML +=
        '    <table class = "shopButton unselectable" onclick="building.purchase(' +
        index +
        ')"><tr><td id = "image"><img alt = "cursorImg" src = "images/' +
        building.image[index] +
        '"></td><td id = "nameAndCost"><p>' +
        building.name[index] +
        '</p><p><span>' +
        building.cost[index] +
        '</span></p></td><td id = "amount"><span>' +
        building.count[index] +
        '</span></td></tr></table>';
    }
  },

  updateUpgrades: function () {
    document.querySelector('#upgradeContainer').innerHTML = '';
    for (let index = 0; index < upgrade.name.length; index++) {
      if (!upgrade.purchased[index]) {
        if (
          upgrade.type[index] == 'building' &&
          building.count[upgrade.buildingIndex[index]] >=
            upgrade.requirement[index]
        ) {
          document.querySelector('#upgradeContainer').innerHTML +=
            '<img src = "images/' +
            upgrade.image[index] +
            '" title = "' +
            upgrade.name[index] +
            ' &#10; ' +
            upgrade.description[index] +
            ' &#10; (' +
            upgrade.cost[index] +
            ' salsa)" onclick = "upgrade.purchase(' +
            index +
            ')">';
        } else if (
          upgrade.type[index] == 'click' &&
          game.totalClicks >= upgrade.requirement[index]
        ) {
          document.querySelector('#upgradeContainer').innerHTML +=
            '<img src = "images/' +
            upgrade.image[index] +
            '" title = "' +
            upgrade.name[index] +
            ' &#10; ' +
            upgrade.description[index] +
            ' &#10; (' +
            upgrade.cost[index] +
            ' salsa)" onclick = "upgrade.purchase(' +
            index +
            ')">';
        }
      }
    }
  },

  updateAchievements: function () {
    document.querySelector('#achievementContainer').innerHTML = '';
    for (let index = 0; index < achievement.name.length; index++) {
      if (achievement.awarded[index]) {
        document.querySelector('#achievementContainer').innerHTML +=
          '<img src = "images/' +
          achievement.image[index] +
          '" title = "' +
          achievement.name[index] +
          ' &#10; ' +
          achievement.description[index] +
          '">';
      }
    }
  }
};

function saveGame() {
  let gameSave = {
    score: game.score,
    totalScore: game.totalScore,
    totalClicks: game.totalClicks,
    clickValue: game.clickValue,
    version: game.version,
    buildingCount: building.count,
    buildingIncome: building.income,
    buildingCost: building.cost,
    upgradePurchased: upgrade.purchased,
    achievementAwarded: achievement.awarded
  };
  localStorage.setItem('gameSave', JSON.stringify(gameSave));
}

function loadGame() {
  let savedGame = JSON.parse(localStorage.getItem('gameSave'));
  if (localStorage.getItem('gameSave') !== null) {
    if (typeof savedGame.score !== 'undefined') game.score = savedGame.score;
    if (typeof savedGame.totalScore !== 'undefined')
      game.totalScore = savedGame.totalScore;
    if (typeof savedGame.totalClicks !== 'undefined')
      game.totalClicks = savedGame.totalClicks;
    if (typeof savedGame.clickValue !== 'undefined')
      game.clickValue = savedGame.clickValue;
    if (typeof savedGame.buildingCount !== 'undefined') {
      for (let index = 0; index < savedGame.buildingCount.length; index++) {
        building.count[index] = savedGame.buildingCount[index];
      }
    }
    if (typeof savedGame.buildingIncome !== 'undefined') {
      for (let index = 0; index < savedGame.buildingIncome.length; index++) {
        building.income[index] = savedGame.buildingIncome[index];
      }
    }
    if (typeof savedGame.buildingCost !== 'undefined') {
      for (let index = 0; index < savedGame.buildingCost.length; index++) {
        building.cost[index] = savedGame.buildingCost[index];
      }
    }
    if (typeof savedGame.upgradePurchased !== 'undefined') {
      for (let index = 0; index < savedGame.upgradePurchased.length; index++) {
        upgrade.purchased[index] = savedGame.upgradePurchased[index];
      }
    }
    if (typeof savedGame.achievementAwarded !== 'undefined') {
      for (
        let index = 0;
        index < savedGame.achievementAwarded.length;
        index++
      ) {
        upgrade.purchased[index] = savedGame.achievementAwarded[index];
      }
    }
  }
}

function resetGame() {
  if (confirm('Are you sure you want to reset your game')) {
    let gameSave = {};
    localStorage.setItem('gameSave', JSON.stringify(gameSave));
    location.reload();
  }
}

function randomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function fadeOut(element, duration, finalOpacity, callback) {
  let opacity = 1;

  let elementFadingInterval = window.setInterval(function () {
    opacity -= 50 / duration;

    if (opacity <= finalOpacity) {
      clearInterval(elementFadingInterval);
      callback();
    }

    element.style.opacity = opacity;
  }, 50);
}

function createNumberOnClicker(event) {
  // Grab the clicker
  let clicker = document.querySelector('#clicker');

  // Grab the position on where the clicker was clicked
  let clickerOffSet = clicker.getBoundingClientRect();
  let position = {
    x: event.pageX - clickerOffSet.left + randomNumber(-5, 5),
    y: event.pageY - clickerOffSet.top
  };

  // Create the number
  let element = document.createElement('div');
  element.textContent = '+' + game.clickValue;
  element.classList.add('number', 'unselectable');
  element.style.left = position.x + 'px';
  element.style.top = position.y + 'px';

  // Add the number to the clicker
  clicker.append(element);

  // Slowly rise the element
  let movementInterval = window.setInterval(function () {
    if (typeof element == 'undefined' && element == undefined)
      clearinterval(movementInterval);
    position.y -= 1;
    element.style.top = position.y + 'px';
  }, 10);

  // Slowly fade out the element
  fadeOut(element, 3000, 0.5, function () {
    element.remove();
  });
}

document.querySelector('#clicker').addEventListener('click', function (event) {
  game.totalClicks += 1;
  game.addToScore(game.clickValue);

  createNumberOnClicker(event);
});

window.addEventListener('load', function () {
  loadGame();
  display.updateScore();
  display.updateUpgrades();
  display.updateAchievements();
  display.updateShop();
});

setInterval(function () {
  for (let index = 0; index < achievement.name.length; index++) {
    if (
      achievement.type[index] == 'score' &&
      game.totalScore >= achievement.requirement[index]
    )
      achievement.earn(index);
    else if (
      achievement.type[index] == 'click' &&
      game.totalClicks >= achievement.requirement[index]
    )
      achievement.earn(index);
    else if (
      achievement.type[index] == 'building' &&
      building.count[achievement.objectIndex[index]] >=
        achievement.requirement[index]
    )
      achievement.earn(index);
  }
  game.score += game.getScorePerSecond();
  game.totalScore += game.getScorePerSecond();
  display.updateScore();
  display.updateAchievements();
}, 1000); // 1000ms = 1 second

setInterval(function () {
  display.updateScore();
  display.updateUpgrades();
}, 10_000);

setInterval(function () {
  // saveGame();
}, 30_000); // 30000ms = 30 second

document.addEventListener(
  'keydown',
  function (event) {
    if (event.ctrlKey && event.key === 's') {
      // ctrl + s
      event.preventDefault();
      saveGame();
    }
  },
  false
);
