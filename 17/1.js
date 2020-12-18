const fs = require('fs');

const input = fs.readFileSync('./input.txt')
  .toString('utf-8')
  .split("\n")
  .filter(row => row)
  .map(row => row.split(''));

let state = [input];

for (let cycle = 0; cycle < 6; cycle++) {
  let newState = [];
  for (let z = 0; z < state.length + 2; z++) {
    newState.push([]);
    for (let y = 0; y < state[0].length + 2; y ++) {
      newState[z].push([]);
      for (let x = 0; x < state[0][0].length + 2; x++) {
        const currentVal = state?.[z - 1]?.[y - 1]?.[x - 1] || '.';

        let neighbors = 0;

        for (let oZ = -1; oZ < 2; oZ++) {
          for (let oY = -1; oY < 2; oY++) {
            for (let oX = -1; oX < 2; oX++) {
              if (oZ === 0 && oY === 0 && oX === 0) continue;
              if (state?.[z + oZ - 1]?.[y + oY - 1]?.[x + oX - 1] === '#') {
                neighbors++;
              }
            }
          }
        }

        const newValue = (
          (currentVal === '#' && (neighbors === 2 || neighbors === 3)) ||
          (currentVal === '.' && neighbors === 3)
        ) ? '#' : '.';

        newState[z][y][x] = newValue;
      }
    }
  }

  state = newState;
}

let count = 0;
state.forEach(yxState => {
  yxState.forEach(xState => count += xState.filter(x => x === '#').length);
});

console.log(count);
