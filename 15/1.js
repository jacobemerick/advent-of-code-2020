const input = '0,14,6,20,1,4'.split(',').map(val => parseInt(val));

for (let i = input.length; i < 2020; i++) {
  const lastInsert = input
    .slice(0, -1)
    .reverse()
    .indexOf(input[i - 1]);

  if (lastInsert === -1) input.push(0);
  else input.push(lastInsert + 1);
}

console.log(input[input.length - 1]);
