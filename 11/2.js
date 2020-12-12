const cloneDeep = require('lodash.clonedeep');
const fs = require('fs');

const input = fs.readFileSync('./input.txt')
  .toString('utf-8')
  .split("\n")
  .filter(row => row)
  .map(row => row.split(''));

const makeState = (layout) => layout.reduce((acc, row) => acc + row.join(''), '');

const getAdjacency = (layout, xCurrent, yCurrent, xOffset, yOffset) => {
  let adjacent;

  while (true) {
    xCurrent += xOffset;
    yCurrent += yOffset;

    if (yCurrent < 0 || yCurrent > layout.length - 1) {
      adjacent = 'L';
      break;
    }

    if (xCurrent < 0 || xCurrent > layout[yCurrent].length - 1) {
      adjacent = 'L';
      break;
    }

    if (layout[yCurrent][xCurrent] === '.') continue;

    adjacent = layout[yCurrent][xCurrent];
    break;
  }

  return adjacent;
}

const makeNewLayout = (layout) => {
  const newLayout = cloneDeep(layout);

  for (let row = 0; row < layout.length; row++) {
    for (let seat = 0; seat < layout[row].length; seat++) {
      let occupiedSeats = 0;
      occupiedSeats += (getAdjacency(layout, seat, row, -1, -1) === '#');
      occupiedSeats += (getAdjacency(layout, seat, row, 0, -1) === '#');
      occupiedSeats += (getAdjacency(layout, seat, row, 1, -1) === '#');
      occupiedSeats += (getAdjacency(layout, seat, row, -1, 0) === '#');
      occupiedSeats += (getAdjacency(layout, seat, row, 1, 0) === '#');
      occupiedSeats += (getAdjacency(layout, seat, row, -1, 1) === '#');
      occupiedSeats += (getAdjacency(layout, seat, row, 0, 1) === '#');
      occupiedSeats += (getAdjacency(layout, seat, row, 1, 1) === '#');

      // If a seat is empty (L) and there are no occupied seats occupied to it, the seat becomes occupied.
      if (layout[row][seat] === 'L' && occupiedSeats === 0) {
        newLayout[row][seat] = '#';
      }

      // If a seat is occupied (#) and five or more seats adjacent to it are also occupied, the seat becomes empty.
      else if (layout[row][seat] === '#' && occupiedSeats >= 5) {
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
