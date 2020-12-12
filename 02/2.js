const fs = require('fs');
const xor = require('logical-xor');

const pattern = /(?<pos1>\d+)-(?<pos2>\d+) (?<char>\w): (?<pass>\w+)/;

const input = fs.readFileSync('./input.txt')
  .toString('utf-8')
  .split("\n")
  .filter(row => row)
  .map(row => pattern.exec(row))
  .map(row => row.groups);

const correctPasswords = input.filter((record) => {
  return xor(
    record.pass[record.pos1 - 1] === record.char,
    record.pass[record.pos2 - 1] === record.char,
  );
});

console.log(correctPasswords.length);
