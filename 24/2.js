const fs = require('fs');

const input = fs.readFileSync('./input.txt')
  .toString('utf-8')
  .split("\n")
  .filter(row => row);

const dim = 200;
let floor = new Array(dim);
for (let i = 0; i < dim; i++) {
  floor[i] = new Array(dim).fill(0);
}

for (let i = 0; i < input.length; i++) {
  let referenceTileY = dim / 2;
  let referenceTileX = dim / 2;

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

const getAdjacentBlackTiles = (y, x) => {
  let blackTiles = 0;

  for (let a = -1; a <= 1; a++) {
    for (let b = -1; b <= 1; b++) {
      if ((a + b) === 0) continue; // hexagrams, woah
      blackTiles += floor[y + a][x + b];
    }
  }

  return blackTiles;
}

for (let day = 1; day <= 100; day++) {
  const newFloor = new Array(dim);
  for (let i = 0; i < dim; i++) {
    newFloor[i] = new Array(dim).fill(0);
  }
 
  for (let y = 1; y < dim - 1; y++) {
    for (let x = 1; x < dim - 1; x++) {
      const adjacentBlackTiles = getAdjacentBlackTiles(y, x);

      if (floor[y][x] === 1) {
        newFloor[y][x] = (adjacentBlackTiles === 0 || adjacentBlackTiles > 2) ? 0 : 1;
      } else {
        newFloor[y][x] = (adjacentBlackTiles === 2) ? 1 : 0;
      }
    }
  }

  floor = newFloor;

  // console.log(`Day ${day}: ${floor.reduce((acc, val) => acc + val.reduce((a, v) => a + v), 0)}`);
}

console.log(floor.reduce((acc, val) => acc + val.reduce((a, v) => a + v), 0));
