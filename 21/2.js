const fs = require('fs');
const intersection = require('lodash.intersection');

const pattern = /^(?<ingredients>[^\(]+) \(contains (?<allergens>[^\)]+)\)$/;

const input = fs.readFileSync('./input.txt')
  .toString('utf-8')
  .split("\n")
  .filter(row => row)
  .map(row => pattern.exec(row))
  .map(row => ({
    ingredients: row.groups.ingredients.split(' ').filter(i => i),
    allergens: row.groups.allergens.split(', '),
  }));

const foodMap = new Map();

input.forEach(recipe => {
  recipe.allergens.forEach(allergen => {
    if (!foodMap.has(allergen)) foodMap.set(allergen, [recipe.ingredients]);
    else foodMap.set(allergen, foodMap.get(allergen).concat([recipe.ingredients]));
  });
});

const workingFoodMap = new Map();
foodMap.forEach((ingredientLists, allergen) => {
  const commonIngredients = intersection(...ingredientLists);
  workingFoodMap.set(allergen, commonIngredients);
});

const knownAllergens = new Map();

do {
  workingFoodMap.forEach((ingredients, allergen) => {
    if (ingredients.length === 1) knownAllergens.set(ingredients[0], allergen);
    else workingFoodMap.set(allergen, ingredients.filter(ingredient => !knownAllergens.has(ingredient)));
  });
} while (workingFoodMap.size > knownAllergens.size);

const sortingAllergens = [];
knownAllergens.forEach((val, key) => sortingAllergens.push([val, key]));

console.log(
  sortingAllergens
  .sort((val1, val2) => val1[0].localeCompare(val2[0]))
  .map(val => val[1])
  .join(',')
);
