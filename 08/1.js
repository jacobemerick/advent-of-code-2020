const fs = require('fs');

const pattern = /^(?<instruction>\w+) (?<operation>[+\-])(?<amount>\d+)$/;

const input = fs.readFileSync('./input.txt')
  .toString('utf-8')
  .split("\n")
  .filter(row => row)
  .map(entry => pattern.exec(entry))
  .map(matches => matches.groups);

const executedCommands = [];

let position = 0;
let accumulator = 0;

while (true) {
  if (executedCommands.includes(position)) break;
  executedCommands.push(position);

  const command = input[position];

  switch (command.instruction) {
    case 'nop':
      position++;
      break;
    case 'acc':
      if (command.operation === '+') {
        accumulator += parseInt(command.amount);
      } else {
        accumulator -= parseInt(command.amount);
      }

      position++;
      break;
    case 'jmp':
      if (command.operation === '+') {
        position += parseInt(command.amount);
      } else {
        position -= parseInt(command.amount);
      }
      break;
  }
}

console.log(accumulator);
