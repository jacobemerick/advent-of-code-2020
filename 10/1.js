const fs = require('fs');

const input = fs.readFileSync('./input.txt')
  .toString('utf-8')
  .split("\n")
  .filter(row => row)
  .map(row => parseInt(row))
  .sort((a, b) => a - b);

const adapterDifferences = {
  '1': 0,
  '2': 0,
  '3': 0,
};

let lastOutput = 0;

input.forEach(row => {
  const difference = row - lastOutput;
  adapterDifferences[`${difference}`]++;
  lastOutput = row;
});

adapterDifferences['3']++;

console.log(adapterDifferences['1'] * adapterDifferences['3']);
