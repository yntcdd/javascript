/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
class Visualizer {
  static drawNetwork(context, network) {
    const margin = 50;
    const left = margin;
    const top = margin;
    const width = context.canvas.width - margin * 2;
    const height = context.canvas.height - margin * 2;

    const levelHeight = height / network.levels.length;

    for (let index = network.levels.length - 1; index >= 0; index--) {
      const levelTop =
        top +
        lerp(
          height - levelHeight,
          0,
          network.levels.length == 1 ? 0.5 : index / (network.levels.length - 1)
        );

      context.setLineDash([7, 3]);
      Visualizer.drawLevel(
        context,
        network.levels[index],
        left,
        levelTop,
        width,
        levelHeight,
        index == network.levels.length - 1 ? ['🠉', '🠈', '🠊', '🠋'] : []
      );
    }
  }

  static drawLevel(context, level, left, top, width, height, outputLabels) {
    const right = left + width;
    const bottom = top + height;

    const { inputs, outputs, weights, biases } = level;

    for (let index = 0; index < inputs.length; index++) {
      for (let index_ = 0; index_ < outputs.length; index_++) {
        context.beginPath();
        context.moveTo(
          Visualizer.#getNodeX(inputs, index, left, right),
          bottom
        );
        context.lineTo(Visualizer.#getNodeX(outputs, index_, left, right), top);
        context.lineWidth = 2;
        context.strokeStyle = getRGBA(weights[index][index_]);
        context.stroke();
      }
    }

    const nodeRadius = 18;
    for (let index = 0; index < inputs.length; index++) {
      const x = Visualizer.#getNodeX(inputs, index, left, right);
      context.beginPath();
      context.arc(x, bottom, nodeRadius, 0, Math.PI * 2);
      context.fillStyle = 'black';
      context.fill();
      context.beginPath();
      context.arc(x, bottom, nodeRadius * 0.6, 0, Math.PI * 2);
      context.fillStyle = getRGBA(inputs[index]);
      context.fill();
    }

    for (let index = 0; index < outputs.length; index++) {
      const x = Visualizer.#getNodeX(outputs, index, left, right);
      context.beginPath();
      context.arc(x, top, nodeRadius, 0, Math.PI * 2);
      context.fillStyle = 'black';
      context.fill();
      context.beginPath();
      context.arc(x, top, nodeRadius * 0.6, 0, Math.PI * 2);
      context.fillStyle = getRGBA(outputs[index]);
      context.fill();

      context.beginPath();
      context.lineWidth = 2;
      context.arc(x, top, nodeRadius * 0.8, 0, Math.PI * 2);
      context.strokeStyle = getRGBA(biases[index]);
      context.setLineDash([3, 3]);
      context.stroke();
      context.setLineDash([]);

      if (outputLabels[index]) {
        context.beginPath();
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = 'black';
        context.strokeStyle = 'white';
        context.font = nodeRadius * 1.5 + 'px Arial';
        context.fillText(outputLabels[index], x, top + nodeRadius * 0.1);
        context.lineWidth = 0.5;
        context.strokeText(outputLabels[index], x, top + nodeRadius * 0.1);
      }
    }
  }

  static #getNodeX(nodes, index, left, right) {
    return lerp(
      left,
      right,
      nodes.length == 1 ? 0.5 : index / (nodes.length - 1)
    );
  }
}
