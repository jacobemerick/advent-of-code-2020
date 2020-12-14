const fs = require('fs');

const input = fs.readFileSync('./input.txt')
  .toString('utf-8')
  .split("\n");

const myDepartTime = parseInt(input[0]);
const busDepartTimes = input[1].split(',').map(timestamp => parseInt(timestamp));

for (let currentTimestamp = myDepartTime; true; currentTimestamp++) {
  const departingBus = busDepartTimes.find(busId => {
    if (Number.isNaN(busId)) return false;

    if (currentTimestamp % busId === 0) {
      return true;
    }
  });

  if (departingBus) {
    console.log((currentTimestamp - myDepartTime) * departingBus);
    break;
  }
}
