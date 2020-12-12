const fs = require('fs');

const answerSum = fs.readFileSync('./input.txt')
  .toString('utf-8')
  .split("\n\n")
  .map(group => group.split("\n").join(''))
  .map(groupAnswers => [...new Set(groupAnswers)].length)
  .reduce((acc, val) => acc + val, 0);

console.log(answerSum);
