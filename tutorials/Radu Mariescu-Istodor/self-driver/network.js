/* eslint-disable unicorn/no-new-array */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
class NeuralNetwork {
  constructor(neuronCounts) {
    this.levels = [];
    for (let index = 0; index < neuronCounts.length - 1; index++) {
      this.levels.push(new Level(neuronCounts[index], neuronCounts[index + 1]));
    }
  }

  static feedForward(givenInputs, network) {
    let outputs = Level.feedForward(givenInputs, network.levels[0]);
    for (let index = 1; index < network.levels.length; index++) {
      outputs = Level.feedForward(outputs, network.levels[index]);
    }
    return outputs;
  }

  static mutate(network, amount = 1) {
    for (const level of network.levels) {
      for (let index = 0; index < level.biases.length; index++) {
        level.biases[index] = lerp(
          level.biases[index],
          Math.random() * 2 - 1,
          amount
        );
      }
      for (let index = 0; index < level.weights.length; index++) {
        for (let index_ = 0; index_ < level.weights[index].length; index_++) {
          level.weights[index][index_] = lerp(
            level.weights[index][index_],
            Math.random() * 2 - 1,
            amount
          );
        }
      }
    }
  }
}

class Level {
  constructor(inputCount, outputCount) {
    this.inputs = new Array(inputCount);
    this.outputs = new Array(outputCount);
    this.biases = new Array(outputCount);

    this.weights = [];
    for (let index = 0; index < inputCount; index++) {
      this.weights[index] = new Array(outputCount);
    }

    Level.#randomize(this);
  }

  static #randomize(level) {
    for (let index = 0; index < level.inputs.length; index++) {
      for (let index_ = 0; index_ < level.outputs.length; index_++) {
        level.weights[index][index_] = Math.random() * 2 - 1;
      }
    }

    for (let index = 0; index < level.biases.length; index++) {
      level.biases[index] = Math.random() * 2 - 1;
    }
  }

  static feedForward(givenInputs, level) {
    for (let index = 0; index < level.inputs.length; index++) {
      level.inputs[index] = givenInputs[index];
    }

    for (let index = 0; index < level.outputs.length; index++) {
      let sum = 0;
      for (let index_ = 0; index_ < level.inputs.length; index_++) {
        sum += level.inputs[index_] * level.weights[index_][index];
      }

      if (sum > level.biases[index]) {
        level.outputs[index] = 1;
      } else {
        level.outputs[index] = 0;
      }
    }

    return level.outputs;
  }
}
