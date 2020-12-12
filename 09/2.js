const fs = require('fs');

const input = fs.readFileSync('./input.txt')
  .toString('utf-8')
  .split("\n")
  .filter(row => row)
  .map(row => parseInt(row));

const lookbehind = 25;
let weakness;

for (let pos = lookbehind; pos < input.length; pos++) {
  const preamble = input.slice(pos - lookbehind, pos);

  const invertedPreamble = preamble.map(value => input[pos] - value);
  if (!preamble.slice(0).map(value => input[pos] - value).find(value => preamble.includes(value))) {
    weakness = input[pos];
    break;
  }
}

outerLoop:
for (let pos = 0; pos < input.length; pos++) {
  const contingousNumbers = [input[pos]];
  for (let contingousPos = pos + 1; contingousPos < input.length; contingousPos++) {
    contingousNumbers.push(input[contingousPos]);

    const contingousSum = contingousNumbers.reduce((acc, val) => acc + val);
    if (contingousSum > weakness) break;
    if (contingousSum === weakness) {
      contingousNumbers.sort((a, b) => a - b);
      console.log(contingousNumbers[0] + contingousNumbers[contingousNumbers.length - 1]);
      break outerLoop;
    }
  }
}
