const fs = require('fs');

const input = fs.readFileSync('./input.txt')
  .toString('utf-8')
  .split("\n")
  .map(row => row.split(''));

let treesEncountered = 0;

input.forEach((row, ind) => {
  if (ind === 0) return;

  const pos = ind * 3 % row.length;
  if (row[pos] === '#') treesEncountered++;
});

console.log(treesEncountered);
