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
        const pattern = /^(?<count>\d+) (?<type>\w+ \w+) bags?$/;
        const matches = pattern.exec(content);
        return [
          matches.groups.count,
          matches.groups.type,
        ];
      });

    return [
      matches.groups.container,
      contents,
    ];
  });

const mappedInput = new Map(input);

const baggageCount = (color) => {
  const contents = mappedInput.get(color);

  if (contents.length === 0) return 0;

  return contents.reduce((bagSum, bag) => bagSum + bag[0] * (baggageCount(bag[1]) + 1), 0);
};

console.log(baggageCount('shiny gold'));
