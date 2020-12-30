// const input = '389125467'; // test input
const input = '389547612';

const inputCups = input
  .split('')
  .map(val => parseInt(val))
  .map(val => val - 1);

const totalCups = 1000000;
const cups = [];

for (let i = 0; i < totalCups; i++) {
  cups[i] = (i < (totalCups - 1)) ? i + 1 : inputCups[0];
}

inputCups.forEach((val, key, arr) => {
  cups[val] = (key < (arr.length - 1)) ? arr[key + 1] : arr.length;
});

const findDestination = (currentCup, ignoreCups) => {
  let destinationCup = currentCup;
  while (true) {
    destinationCup = (destinationCup === 0) ?
      totalCups - 1:
      destinationCup - 1;
    if (ignoreCups.indexOf(destinationCup) === -1) return destinationCup;
  }
};

const totalMoves = 10000000;

let currentCup = inputCups[0];
for (let move = 1; move <= totalMoves; move++) {
  const removeCup1 = cups[currentCup];
  const removeCup2 = cups[removeCup1];
  const removeCup3 = cups[removeCup2];

  cups[currentCup] = cups[removeCup3];

  const insertCup = findDestination(
    currentCup,
    [removeCup1, removeCup2, removeCup3],
  );

  const nextCup = cups[insertCup];
  cups[insertCup] = removeCup1;
  cups[removeCup3] = nextCup;

  currentCup = cups[currentCup];
}

console.log((cups[0] + 1) * (cups[cups[0]] + 1));
