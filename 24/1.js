const fs = require('fs');

const input = fs.readFileSync('./input.txt')
  .toString('utf-8')
  .split("\n")
  .filter(row => row);

const dim = 100;
const floor = new Array(dim);
for (let i = 0; i < dim; i++) {
  floor[i] = new Array(dim).fill(0);
}

for (let i = 0; i < input.length; i++) {
  let referenceTileY = 50;
  let referenceTileX = 50;

  for (let j = 0; j < input[i].length; j++) {
    let step = input[i][j];
    if (input[i][j] === 'n' || input[i][j] === 's') {
      step += input[i][j+1];
      j++;
    }

    switch (step) {
      case 'nw':
        referenceTileY--;
        referenceTileX--;
        break;
      case 'w':
        referenceTileX--;
        break;
      case 'sw':
        referenceTileY++;
        break;
      case 'se':
        referenceTileY++;
        referenceTileX++;
        break;
      case 'e':
        referenceTileX++;
        break;
      case 'ne':
        referenceTileY--;
        break;
      default:
        throw new Error(`Unknown step direction ${step}`);
    }
  }

  floor[referenceTileY][referenceTileX] = (floor[referenceTileY][referenceTileX] === 0) ? 1 : 0;
}

console.log(floor.reduce((acc, val) => acc + val.reduce((a, v) => a + v), 0));
