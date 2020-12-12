const fs = require('fs');

const pattern = /^(?<instruction>\w+) (?<operation>[+\-])(?<amount>\d+)$/;

const input = fs.readFileSync('./input.txt')
  .toString('utf-8')
  .split("\n")
  .filter(row => row)
  .map(entry => pattern.exec(entry))
  .map(matches => matches.groups);

let accumulator;

outerLoop:
for (let modifiedPosition = 0; modifiedPosition < input.length; modifiedPosition++) {
  const executedCommands = [];

  let position = 0;
  accumulator = 0;

  while (true) {
    if (position === input.length) break outerLoop;

    if (executedCommands.includes(position)) break;
    executedCommands.push(position);

    const command = input[position];
    const instruction = (() => {
      if (position !== modifiedPosition) return command.instruction;

      if (command.instruction === 'acc') return command.instruction;
      return (command.instruction === 'nop') ? 'jmp' : 'nop';
    })();

    switch (instruction) {
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
}

console.log(accumulator);
