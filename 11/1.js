const cloneDeep = require('lodash.clonedeep');
const fs = require('fs');

const input = fs.readFileSync('./input.txt')
  .toString('utf-8')
  .split("\n")
  .filter(row => row)
  .map(row => row.split(''));

const makeState = (layout) => layout.reduce((acc, row) => acc + row.join(''), '');

const makeNewLayout = (layout) => {
  const newLayout = cloneDeep(layout);

  for (let row = 0; row < layout.length; row++) {
    for (let seat = 0; seat < layout[row].length; seat++) {
      let occupiedSeats = 0;
      if (row > 0) {
        if (seat > 0) {
          occupiedSeats += (layout[row - 1][seat - 1] === '#');
        }
        occupiedSeats += (layout[row - 1][seat] === '#');
        if (seat < layout[row].length - 1) {
          occupiedSeats += (layout[row - 1][seat + 1] === '#');
        }
      }

      if (seat > 0) {
        occupiedSeats += (layout[row][seat - 1] === '#');
      }
      if (seat < layout[row].length - 1) {
        occupiedSeats += (layout[row][seat + 1] === '#');
      }

      if (row < layout.length - 1) {
        if (seat > 0) {
          occupiedSeats += (layout[row + 1][seat - 1] === '#');
        }
        occupiedSeats += (layout[row + 1][seat] === '#');
        if (seat < layout[row].length - 1) {
          occupiedSeats += (layout[row + 1][seat + 1] === '#');
        }
      }

      // If a seat is empty (L) and there are no occupied seats occupied to it, the seat becomes occupied.
      if (layout[row][seat] === 'L' && occupiedSeats === 0) {
        newLayout[row][seat] = '#';
      }

      // If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
      else if (layout[row][seat] === '#' && occupiedSeats >= 4) {
        newLayout[row][seat] = 'L';
      }

      else {
        newLayout[row][seat] = layout[row][seat];
      }
    }
  }

  return newLayout;
}

let layout = input;
let state = makeState(layout);

while (true) {
  const newLayout = makeNewLayout(layout);
  const newState = makeState(newLayout);

  if (newState === state) {
    break;
  }

  state = newState;
  layout = newLayout;
}

console.log(state.match(/#/g).length);
