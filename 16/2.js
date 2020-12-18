const fs = require('fs');
const intersection = require('lodash.intersection');

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

const validTickets = nearbyTickets.filter(ticket => ticket.every(val => ruleList.some(rule => (
  rule.range1[0] <= val && rule.range1[1] >= val ||
  rule.range2[0] <= val && rule.range2[1] >= val
))));

const rulePosition = {};
ruleList.forEach(rule => rulePosition[rule.label] = []);

validTickets.forEach((ticket, ticketNum) => ticket.forEach((val, ind) => ruleList.forEach(rule => {
  if (
    (rule.range1[0] <= val && rule.range1[1] >= val) ||
    (rule.range2[0] <= val && rule.range2[1] >= val)
  ) {
    if (!rulePosition[rule.label][ticketNum]) {
      rulePosition[rule.label][ticketNum] = [];
    }
    rulePosition[rule.label][ticketNum].push(ind);
  }
})));

const myTicket = input[1][1].split(',').map(val => parseInt(val));

const ticketPosition = new Map();
const claimedPositions = [];
do {
  for (const ruleLabel in rulePosition) {
    const simplifiedTickets = rulePosition[ruleLabel].map(ticket => ticket.filter(val => !claimedPositions.includes(val)));
    const commonRules = intersection(...simplifiedTickets);

    if (commonRules.length === 1) {
      claimedPositions.push(commonRules[0]);
      ticketPosition.set(ruleLabel, commonRules[0]);
    }
  }
} while (ticketPosition.size < myTicket.length);

let value = 1;
ticketPosition.forEach((pos, label) => {
  if (label.substring(0, 9) === 'departure') {
    value *= myTicket[pos];
  }
});

console.log(value);
