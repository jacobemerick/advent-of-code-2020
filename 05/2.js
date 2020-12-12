const fs = require('fs');

const input = fs.readFileSync('./input.txt')
  .toString('utf-8')
  .split("\n")
  .filter(row => row);

const seatIds = [];

input.forEach(pass => {
  const row = parseInt(pass.substr(0, 7).replace(/F/g, '0').replace(/B/g, '1'), 2);
  const seat = parseInt(pass.substr(-3).replace(/L/g, '0').replace(/R/g, '1'), 2);

  const seatId = row * 8 + seat;
  seatIds.push(seatId);
});

seatIds.sort();

const lowestSeatId = seatIds[0];

const missingSeatId = seatIds.find((seatId, index) => {
  if (lowestSeatId + index !== seatId) return true;
});

console.log(missingSeatId - 1);
