const fs = require('fs');

const input = fs.readFileSync('./input.txt')
  .toString('utf-8')
  .split("\n")
  .filter(row => row);

let highestSeatId = 0;

input.forEach(pass => {
  const row = parseInt(pass.substr(0, 7).replace(/F/g, '0').replace(/B/g, '1'), 2);
  const seat = parseInt(pass.substr(-3).replace(/L/g, '0').replace(/R/g, '1'), 2);

  const seatId = row * 8 + seat;
  if (seatId > highestSeatId) highestSeatId = seatId;
});

console.log(highestSeatId);
