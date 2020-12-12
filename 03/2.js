const fs = require('fs');

const input = fs.readFileSync('./input.txt')
  .toString('utf-8')
  .split("\n")
  .map(row => row.split(''));

let treesMultipled = 1;

const slopes = [
  { right: 1, down: 1 },
  { right: 3, down: 1 },
  { right: 5, down: 1 },
  { right: 7, down: 1 },
  { right: 1, down: 2 },
];

slopes.forEach(slope => {
  let treesEncountered = 0;

  input.forEach((row, ind) => {
    if (ind === 0 || ind % slope.down === 1) return;

    const pos = ind / slope.down * slope.right % row.length;
    if (row[pos] === '#') treesEncountered++;
  });

  treesMultipled *= treesEncountered;
});

console.log(treesMultipled);
