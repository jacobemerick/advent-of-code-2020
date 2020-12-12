const fs = require('fs');

const input = fs.readFileSync('./input.txt')
  .toString('utf-8')
  .split("\n")
  .filter(row => row)
  .map(entry => {
    const pattern = /^(?<container>\w+ \w+) bags contain (?<contents>[^\.]*)\.$/;
    const matches = pattern.exec(entry);

    if (matches.groups.contents === 'no other bags') {
      return [
        matches.groups.container,
        [],
      ];
    }

    const contents = matches.groups.contents
      .split(',')
      .map(content => content.trim())
      .map(content => {
        const pattern = /^\d+ (?<type>\w+ \w+) bags?$/;
        const matches = pattern.exec(content);
        return matches.groups.type;
      });

    return [
      matches.groups.container,
      contents,
    ];
  })
  .filter(entry => entry[1].length > 0);

const shinyGoldBagContainers = [];

const baggageCheck = (color) => {
  input.forEach(entry => {
    if (
      entry[1].includes(color) &&
      !shinyGoldBagContainers.includes(entry[0])
    ) {
      shinyGoldBagContainers.push(entry[0]);
      baggageCheck(entry[0]);
    }
  });
};

baggageCheck('shiny gold');

console.log(shinyGoldBagContainers.length);
