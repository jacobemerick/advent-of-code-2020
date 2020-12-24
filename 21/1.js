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

const knownIngredients = [];

do {
  workingFoodMap.forEach((ingredients, allergen) => {
    if (ingredients.length === 1 && !knownIngredients.includes(ingredients[0])) knownIngredients.push(ingredients[0]);
    else workingFoodMap.set(allergen, ingredients.filter(ingredient => !knownIngredients.includes(ingredient)));
  });
} while (workingFoodMap.size > knownIngredients.length);

let safeIngredientCount = 0;
input.forEach(recipe => {
  safeIngredientCount += (recipe.ingredients.length - intersection(recipe.ingredients, knownIngredients).length);
});

console.log(safeIngredientCount);
