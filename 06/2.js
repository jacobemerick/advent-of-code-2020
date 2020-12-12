const fs = require('fs');
const intersection = require('lodash.intersection');

const commonAnswers = fs.readFileSync('./input.txt')
  .toString('utf-8')
  .split("\n\n")
  .map(group => group.split("\n").filter(row => row).map(member => member.split('')))
  .reduce((acc, group) => { return intersection(...group).length + acc; }, 0);

console.log(commonAnswers);
