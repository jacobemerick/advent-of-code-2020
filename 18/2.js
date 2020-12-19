const fs = require('fs');

const input = fs.readFileSync('./input.txt')
  .toString('utf-8')
  .split("\n")
  .filter(row => row);

const solveEquation = (equation) => {
  if (equation.match(/^\d+$/)) return parseInt(equation);

  const parentheses = equation.match(/\(([^\(\)]+)\)/);
  if (parentheses) return solveEquation(equation.replace(parentheses[0], solveEquation(parentheses[1])));

  const addition = equation.match(/(\d+) \+ (\d+)/);
  if (addition) return solveEquation(equation.replace(addition[0], parseInt(addition[1]) + parseInt(addition[2])));

  const multiplication = equation.match(/(\d+) \* (\d+)/);
  if (multiplication) return solveEquation(equation.replace(multiplication[0], parseInt(multiplication[1]) * parseInt(multiplication[2])));

  throw new Error(`unknown maths ${equation}`);
}

console.log(input.reduce((acc, val) => acc += solveEquation(val), 0));
