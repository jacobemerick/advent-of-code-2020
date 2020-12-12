const fs = require('fs');

const input = fs.readFileSync('./input.txt')
  .toString('utf-8')
  .split("\n")
  .filter(row => row)
  .map(row => parseInt(row));

const lookbehind = 25;

for (let pos = lookbehind; pos < input.length; pos++) {
  const preamble = input.slice(pos - lookbehind, pos);

  const invertedPreamble = preamble.map(value => input[pos] - value);
  if (!preamble.slice(0).map(value => input[pos] - value).find(value => preamble.includes(value))) {
    console.log(input[pos]);
    break;
  }
}
