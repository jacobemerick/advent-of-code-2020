const fs = require('fs');

const input = fs.readFileSync('./input.txt')
  .toString('utf-8')
  .split("\n")
  .filter(row => row);

const solveEquation = (equation) => {
  if (equation.match(/^\d+$/)) return parseInt(equation);

  const parentheses = equation.match(/\(([^\(\)]+)\)/);
  if (parentheses) return solveEquation(equation.replace(parentheses[0], solveEquation(parentheses[1])));

  const factors = equation.match(/(\d+) ([*+]) (\d+)/);
  const factorSolution = (factors[2] === '*') ?
    parseInt(factors[1]) * parseInt(factors[3]) :
    parseInt(factors[1]) + parseInt(factors[3]);

  return solveEquation(equation.replace(factors[0], factorSolution));
}

console.log(input.reduce((acc, val) => acc += solveEquation(val), 0));
