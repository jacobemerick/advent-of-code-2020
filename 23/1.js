// const input = '389125467'; // test input
const input = '389547612';

const cups = input.split('').map(val => parseInt(val));
const totalMoves = 100;

const findDestination = (array) => {
  let destinationCup = array[0];
  while (true) {
    destinationCup = (destinationCup === 0) ? 9 : destinationCup - 1;
    if (array.indexOf(destinationCup) > -1) return array.indexOf(destinationCup);
  }
};

for (let move = 1; move <= totalMoves; move++) {
  console.log(`-- move ${move} --`);
  console.log(`cups: ${cups.join(', ')}`);
  console.log(`current cup: ${cups[0]}`);

  const pickUpCups = cups.splice(1, 3);

  console.log(`pick up: ${pickUpCups.join(', ')}`);

  const destinationPosition = findDestination(cups);

  console.log(`destination: ${cups[destinationPosition]}`);
  console.log('');

  cups.splice(destinationPosition + 1, 0, ...pickUpCups);
  cups.push(cups.shift());
}

console.log(cups.slice(cups.indexOf(1) + 1).join('') + cups.slice(0, cups.indexOf(1)).join(''));
