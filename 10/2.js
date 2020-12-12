const fs = require('fs');

const input = fs.readFileSync('./input.txt')
  .toString('utf-8')
  .split("\n")
  .filter(row => row)
  .map(row => parseInt(row))
  .sort((a, b) => a - b);

// pattern deduced by whiteboard.
// there's probably a math-y reason w/ fancy combinations that high school kids know
const combinationMap = {
  '1': 1,
  '2': 1,
  '3': 2,
  '4': 4,
  '5': 7,
};

const singleOffsetChains = [];

let lastOutput = 0;
let singleOffsetChain = 1;

input.forEach(row => {
  const difference = row - lastOutput;

  if (difference === 1) {
    singleOffsetChain++;
  } else {
    singleOffsetChains.push(singleOffsetChain);
    singleOffsetChain = 1;
  }
    
  lastOutput = row;
});

singleOffsetChains.push(singleOffsetChain);

const combinations = singleOffsetChains.reduce((acc, chain) => acc * combinationMap[`${chain}`], 1);

console.log(combinations);
