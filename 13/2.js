const fs = require('fs');

const input = fs.readFileSync('./input.txt')
  .toString('utf-8')
  .split("\n");

// chinese remainder theorem
// https://www.geeksforgeeks.org/chinese-remainder-theorem-set-2-implementation/
const numbers = input[1]
  .split(',')
  .filter(val => val !== 'x')
  .map(val => BigInt(val));

const remainder = input[1]
  .split(',')
  .map((val, ind) => (val === 'x') ? val : ind)
  .filter(val => val !== 'x')
  .map(val => BigInt(val));

// product of all numbers
const product = numbers.reduce((acc, val) => acc * val);

// sum of (remainder * (product / number) * modular inverse
const sum = numbers.reduce((acc, val, ind) => {
  const valFactor = product / val;

  const modInverse = () => {
    const mod = valFactor % val;
    for (let i = 1n; i < val; i++) {
      if ((mod * i) % val === 1n) return i;
    }
  };

  return acc += (val - remainder[ind]) * valFactor * modInverse();
}, 0n);

console.log(Number(sum % product));
