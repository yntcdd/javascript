/* eslint-disable unicorn/prefer-includes */
/* eslint-disable arrow-parens */
/* eslint-disable unicorn/prevent-abbreviations */
export class InputHandler {
  constructor(game) {
    this.game = game;
    this.keys = [];
    this.gamepadKeys = [];
    this.gamepadControl = {};
    this.initialize();
  }
  initialize() {
    window.addEventListener('keydown', e => {
      if (
        (e.key === 'ArrowDown' ||
          e.key === 'ArrowUp' ||
          e.key === 'ArrowLeft' ||
          e.key === 'ArrowRight' ||
          e.key === 'Enter') &&
        this.keys.indexOf(e.key) === -1
      ) {
        this.keys.push(e.key);
        console.log(this.keys);
      } else if (e.key === 'd') this.game.debug = !this.game.debug;
    });
    window.addEventListener('keyup', e => {
      if (
        e.key === 'ArrowDown' ||
        e.key === 'ArrowUp' ||
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight' ||
        e.key === 'Enter'
      ) {
        console.log(this.keys);
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
    });

    for (let index = 0; index < 22; index++) {
      this.gamepadControl[index] = 0;
    }
    window.addEventListener('gamepaddisconnected', event => {
      console.log('connected:', event.gamepad.connected);
    });
    window.addEventListener('gamepadconnected', event => {
      const gamepadIndex = event.gamepad.index;
      console.log('index:', gamepadIndex);
      console.log('id:', event.gamepad.id);
      console.log('mapping:', event.gamepad.mapping);
      const update = () => {
        for (const gamepad of navigator.getGamepads()) {
          if (!gamepad) continue;
          const myGamepad = navigator.getGamepads()[gamepadIndex];
          // buttons
          for (const [buttonIndex, isPressedTouched] of myGamepad.buttons
            .map(event => [event.pressed, event.touched, event.value])
            .entries()) {
            // press or touched
            if (isPressedTouched[0] || isPressedTouched[1]) {
              this.gamepadControl[buttonIndex + 4] = isPressedTouched[2];
              // console.log(buttonIndex, isPressedTouched[2], this.gamepadKeys);
              if (
                buttonIndex === 12 &&
                this.gamepadKeys.indexOf('ArrowUp') === -1
              ) {
                this.gamepadKeys.push('ArrowUp');
              }
              if (
                buttonIndex === 13 &&
                this.gamepadKeys.indexOf('ArrowDown') === -1
              ) {
                this.gamepadKeys.push('ArrowDown');
              }
              if (
                buttonIndex === 14 &&
                this.gamepadKeys.indexOf('ArrowLeft') === -1
              ) {
                this.gamepadKeys.push('ArrowLeft');
              }
              if (
                buttonIndex === 15 &&
                this.gamepadKeys.indexOf('ArrowRight') === -1
              ) {
                this.gamepadKeys.push('ArrowRight');
              }
              if (
                buttonIndex === 3 &&
                this.gamepadKeys.indexOf('Enter') === -1
              ) {
                this.gamepadKeys.push('Enter');
                // this.gamepadKeys.splice(this.gamepadKeys.indexOf('ArrowDown'), 1);
                // this.gamepadKeys.splice(this.gamepadKeys.indexOf('ArrowLeft'), 1);
                // this.gamepadKeys.splice(this.gamepadKeys.indexOf('ArrowUp'), 1);
                // this.gamepadKeys.splice(this.gamepadKeys.indexOf('ArrowRight'), 1);
              }
              if (buttonIndex === 2) {
                this.game.debug = !this.game.debug;
              }
              // if (!buttonIndex === 13)
              //   this.gamepadKeys.splice(this.gamepadKeys.indexOf('ArrowDown'), 1);
              // if (!buttonIndex === 14)
              //   this.gamepadKeys.splice(this.gamepadKeys.indexOf('ArrowLeft'), 1);
              // if (!buttonIndex === 12)
              //   this.gamepadKeys.splice(this.gamepadKeys.indexOf('ArrowUp'), 1);
              // if (!buttonIndex === 15)
              //   this.gamepadKeys.splice(this.gamepadKeys.indexOf('ArrowRight'), 1);
            } else {
              // console.log('keyup:', buttonIndex, this.gamepadKeys);
              this.gamepadControl[buttonIndex + 4] = 0;
              if (buttonIndex === 13)
                this.gamepadKeys.splice(
                  this.gamepadKeys.indexOf('ArrowDown'),
                  1
                );
              if (buttonIndex === 14)
                this.gamepadKeys.splice(
                  this.gamepadKeys.indexOf('ArrowLeft'),
                  1
                );
              if (buttonIndex === 12)
                this.gamepadKeys.splice(this.gamepadKeys.indexOf('ArrowUp'), 1);
              if (buttonIndex === 15)
                this.gamepadKeys.splice(
                  this.gamepadKeys.indexOf('ArrowRight'),
                  1
                );
              if (buttonIndex === 3)
                this.gamepadKeys.splice(this.gamepadKeys.indexOf('Enter'), 1);
            }
          }
          // axies
          // for (const [index, axis] of myGamepad.axes.entries()) {
          //   this.gamepadControl[index] = Math.round(axis * 1e2) / 1e2; //round 2 decimal place
          // }
        }
        // this.keys = [...new Set(...this.keys, ...this.gamepadKeys)];
        setInterval(update, 500);
        // requestAnimationFrame(update);
      };
      update();
    });
  }
}
