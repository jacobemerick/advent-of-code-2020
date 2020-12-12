const fs = require('fs');

const input = fs.readFileSync('./input.txt')
  .toString('utf-8')
  .split("\n")
  .filter(row => row)

const compassRose = ['N', 'W', 'S', 'E'];

let shipDirection = 'E';
const shipPosition = {
  x: 0,
  y: 0,
};

const moveShip = (direction, amount) => {
  switch (direction) {
    case 'N':
      shipPosition.x -= amount;
      break;
    case 'S':
      shipPosition.x += amount;
      break;
    case 'E':
      shipPosition.y += amount;
      break;
    case 'W':
      shipPosition.y -= amount;
      break;
  }
};

const rotateShip = (direction, amount) => {
  shipDirection = compassRose[((direction === 'L') ?
    compassRose.indexOf(shipDirection) + amount / 90 :
    (compassRose.indexOf(shipDirection) - amount / 90 + 4)) % 4];
};
 
input.forEach(row => {
  const command = row[0];
  const amount = parseInt(row.slice(1));

  if (['N', 'S', 'E', 'W'].includes(command)) moveShip(command, amount);
  if (command === 'F') moveShip(shipDirection, amount);
  if (['L', 'R'].includes(command)) rotateShip(command, amount);
});

console.log(Math.abs(shipPosition.x) + Math.abs(shipPosition.y)); 
