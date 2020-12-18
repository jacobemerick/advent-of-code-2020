const fs = require('fs');

const pattern = /(?<pos1>\d+)-(?<pos2>\d+) (?<char>\w): (?<pass>\w+)/;

const input = fs.readFileSync('./input.txt')
  .toString('utf-8')
  .split("\n\n")
  .filter(row => row)
  .map(row => row.split("\n"));

const rulePattern = /^(?<label>[^:]+): (?<range1>[\d-]+) or (?<range2>[\d-]+)$/;
const ruleList = input[0]
  .filter(row => row)
  .map(row => rulePattern.exec(row))
  .map(row => row.groups)
  .map(row => ({
    label: row.label,
    'range1': row.range1.split('-').map(val => parseInt(val)),
    'range2': row.range2.split('-').map(val => parseInt(val)),
  }));

const nearbyTickets = input[2]
  .slice(1)
  .filter(row => row)
  .map(row => row.split(',').map(val => parseInt(val)));

const invalidValues = [];

nearbyTickets.forEach(ticket => {
  ticket.forEach(val => {
    if (!ruleList.some(rule => (
      rule.range1[0] <= val && rule.range1[1] >= val ||
      rule.range2[0] <= val && rule.range2[1] >= val
    ))) {
      invalidValues.push(val);
    }
  });
});

console.log(invalidValues.reduce((acc, val) => acc += val, 0));
