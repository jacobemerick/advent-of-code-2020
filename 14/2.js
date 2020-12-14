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
      value: parseInt(matches.groups.value),
      address: parseInt(matches.groups.address, 10).toString(2).split('').reverse(),
    };
  });

let output = new Map();
let mask;
input.forEach(row => {
  if (row.type === 'mask') {
    mask = row.value;
    return;
  }

  let newMask = [];
  for (let i = 0; i < 36; i++) {
    if (mask[i] === '0') {
      if (row.address[i]) newMask[i] = row.address[i];
      else newMask[i] = '0';
    }
    else if (mask[i] === '1') newMask[i] = '1';
    else newMask[i] = 'X';
  }

  const newAddresses = [];
  for (let i = 0; i < 2 ** newMask.filter(row => row === 'X').length; i++) {
    const floatReplacements = i.toString(2).split('').reverse();

    let replaceKey = -1;
    newAddresses.push(newMask.map(val => {
      if (val !== 'X') return val;

      replaceKey++;
      if (floatReplacements[replaceKey]) return floatReplacements[replaceKey];
      return '0';
    }));
  }

  newAddresses.forEach(address => {
    const intAddress = parseInt(address.reverse().join(''), 2);
    output.set(intAddress, row.value);
  });
});

let sum = 0;
output.forEach(val => sum += val);

console.log(sum);
