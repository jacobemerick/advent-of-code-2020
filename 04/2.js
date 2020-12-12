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

const validPassports = input.filter(entry => {
  if (!requiredFields.every(field => entry.has(field))) return false;

  if (!['byr', 'iyr', 'eyr'].every(dateField => entry.get(dateField).match(/^\d{4}$/))) return false;
  if (entry.get('byr') < 1920 || entry.get('byr') > 2002) return false;
  if (entry.get('iyr') < 2010 || entry.get('iyr') > 2020) return false;
  if (entry.get('eyr') < 2020 || entry.get('eyr') > 2030) return false;

  if (entry.get('hgt').substr(-2) === 'cm') {
    if (parseInt(entry.get('hgt')) < 150 || parseInt(entry.get('hgt')) > 193) return false;
  } else if (entry.get('hgt').substr(-2) === 'in') {
    if (parseInt(entry.get('hgt')) < 59 || parseInt(entry.get('hgt')) > 76) return false;
  } else {
    return false;
  }

  if (!entry.get('hcl').match(/^#[0-9a-f]{6}$/)) return false;
  if (!['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].find(eyeColor => entry.get('ecl') === eyeColor)) return false;
  if (!entry.get('pid').match(/^\d{9}$/)) return false;

  return true;
});

console.log(validPassports.length);
