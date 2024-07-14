/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable unicorn/no-for-loop */
const userChoiceDisplay = document.createElement('h1');
const computerChoiceDisplay = document.createElement('h1');
const resultDisplay = document.createElement('h1');
const gameGrid = document.querySelector('#game');
gameGrid.append(userChoiceDisplay, computerChoiceDisplay, resultDisplay);

const choices = ['rock', 'paper', 'scissors'];
let userChoice;
let computerChoice;

const handleClick = (e) => {
  userChoice = e.target.id;
  userChoiceDisplay.innerHTML = 'User choice: ' + userChoice;
  generateComputerChoice();
  getResult();
};

const generateComputerChoice = () => {
  const randomChoice = choices[Math.floor(Math.random() * choices.length)];
  computerChoice = randomChoice;
  computerChoiceDisplay.innerHTML = 'Computer choice: ' + computerChoice;
};

// eslint-disable-next-line unicorn/prevent-abbreviations
for (let i = 0; i < choices.length; i++) {
  const button = document.createElement('button');
  button.id = choices[i]; // you can delete this id you want to use e.target.HTML in the handleClick
  button.innerHTML = choices[i];
  button.addEventListener('click', handleClick);
  // eslint-disable-next-line unicorn/prefer-dom-node-append
  gameGrid.appendChild(button);
}

const getResult = () => {
  switch (userChoice + computerChoice) {
    case 'scissorspaper':
    case 'rockscissors':
    case 'paperrock':
      resultDisplay.innerHTML = 'YOU WIN!';
      break;
    case 'paperscissors':
    case 'scissorsrock':
    case 'rockpaper':
      resultDisplay.innerHTML = 'YOU LOSE!';
      break;
    case 'paperpaper':
    case 'scissorsscissors':
    case 'rockrock':
      resultDisplay.innerHTML = 'ITS A DRAW!';
      break;
  }
};
