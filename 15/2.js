const input = '0,14,6,20,1,4'.split(',').map(val => parseInt(val));

const spokeMemory = new Map();
input.forEach((val, key) => spokeMemory.set(val, key + 1));

let lastSpoken = input[input.length - 1];

for (let i = input.length; i < 30000000; i++) {
  if (!spokeMemory.has(lastSpoken)) {
    spokeMemory.set(lastSpoken, i);
    lastSpoken = 0;
  } else {
    const previousSpoken = spokeMemory.get(lastSpoken);
    spokeMemory.set(lastSpoken, i);
    lastSpoken = i - previousSpoken;
  }
}

console.log(lastSpoken);
