const fs = require('fs');

const assignmentPattern = /^mem\[(?<address>\d+)\] = (?<value>\d+)$/;
const bitmaskPattern = /^mask = (?<mask>[X10]+)$/;

const input = fs.readFileSync('./input.txt')
  .toString('utf-8')
  .split("\n")
  .filter(row => row)
  .map(row => {
    if (row.search('mask') === 0) {
      const matches = bitmaskPattern.exec(row);
      return {
        type: 'mask',
        value: matches.groups.mask.split('').reverse(),
      };
    }

    const matches = assignmentPattern.exec(row);
    return {
      type: 'assignment',
      address: matches.groups.address,
      value: parseInt(matches.groups.value).toString(2).split('').reverse(),
    };
  });

let output = new Map();
let mask;
input.forEach(row => {
  if (row.type === 'mask') {
    mask = row.value;
    return;
  }

  let finalValue = [];
  for (let i = 0; i < 36; i++) {
    if (mask[i] !== 'X') finalValue[i] = mask[i];
    else if (row.value.length > i) finalValue[i] = row.value[i];
    else finalValue[i] = 0;
  }

  output.set(row.address, finalValue);
});

let sum = 0;
output.forEach(val => sum += parseInt(val.reverse().join(''), 2));

console.log(sum);
