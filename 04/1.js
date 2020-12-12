const fs = require('fs');

const input = fs.readFileSync('./input.txt')
  .toString('utf-8')
  .split("\n\n")
  .map(entry => entry.split(/\s|\n/).map(field => field.split(':')))
  .map(entry => new Map(entry));

const requiredFields = [
  'byr', // Birth Year
  'iyr', // Issue Year
  'eyr', // Expiration Year
  'hgt', // Height
  'hcl', // Hair Color
  'ecl', // Eye Color
  'pid', // Passport ID
//  'cid', // Country ID
];

const validPassports = input.filter(entry => requiredFields.every(field => entry.has(field)));

console.log(validPassports.length);
