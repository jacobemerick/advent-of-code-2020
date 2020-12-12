const fs = require('fs');

const pattern = /(?<min>\d+)-(?<max>\d+) (?<char>\w): (?<pass>\w+)/;

const input = fs.readFileSync('./input.txt')
  .toString('utf-8')
  .split("\n")
  .filter(row => row)
  .map(row => pattern.exec(row))
  .map(row => row.groups);

const correctPasswords = input.filter((record) => {
  const occurances = record.pass.split(record.char).length - 1;
  return occurances >= record.min && occurances <= record.max;
});

console.log(correctPasswords.length);
