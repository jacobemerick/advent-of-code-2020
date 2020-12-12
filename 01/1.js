const fs = require('fs');

const input = fs.readFileSync('./input.txt')
  .toString('utf-8')
  .split("\n")
  .map(val => parseInt(val));

input.some((key1) => {
  return input.some((key2) => {
    if (key1 + key2 === 2020) {
      console.log(key1 * key2);
      return true;
    }
  });
});
