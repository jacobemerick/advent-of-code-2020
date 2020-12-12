const fs = require('fs');

const input = fs.readFileSync('./input.txt')
  .toString('utf-8')
  .split("\n")
  .filter(row => row)

const shipPosition = {
  x: 0,
  y: 0,
};

const waypointPosition = {
  x: 10,
  y: 1,
};

const moveShip = (amount) => {
  shipPosition.x += waypointPosition.x * amount;
  shipPosition.y += waypointPosition.y * amount;
}

const moveWaypoint = (direction, amount) => {
  switch (direction) {
    case 'N':
      waypointPosition.y += amount;
      break;
    case 'S':
      waypointPosition.y -= amount;
      break;
    case 'E':
      waypointPosition.x += amount;
      break;
    case 'W':
      waypointPosition.x -= amount;
      break;
  }
};

const rotateWaypoint = (direction, amount) => {
  const x = waypointPosition.x;
  const y = waypointPosition.y;

  if (amount === 180) {
    waypointPosition.x = -x;
    waypointPosition.y = -y;
  }

  if (
    (direction === 'L' && amount === 90) ||
    (direction === 'R' && amount === 270)
  ) {
    waypointPosition.x = -y;
    waypointPosition.y = x;
  }

  if (
    (direction === 'L' && amount === 270) ||
    (direction === 'R' && amount === 90)
  ) {
    waypointPosition.x = y;
    waypointPosition.y = -x;
  }
};
 
input.forEach(row => {
  const command = row[0];
  const amount = parseInt(row.slice(1));

  if (['N', 'S', 'E', 'W'].includes(command)) moveWaypoint(command, amount);
  if (command === 'F') moveShip(amount);
  if (['L', 'R'].includes(command)) rotateWaypoint(command, amount);
});

console.log(Math.abs(shipPosition.x) + Math.abs(shipPosition.y)); 
