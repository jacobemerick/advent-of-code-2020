const arrayTransform = require('2d-array-rotation');
const fs = require('fs');

const tileMap = new Map(fs.readFileSync('./input.txt')
  .toString('utf-8')
  .split("\n\n")
  .map(tile => [
    tile.match(/^Tile (\d+):/)[1],
    tile.split("\n")
      .filter(row => row)
      .slice(1)
      .map(row => row.split('')),
  ])
);

const doTilesMatch = (t1, t2) => {
  if (t1[0].join('') === t2[t2.length - 1].join('')) return true;
  if (t1[t1.length - 1].join('') === t2[0].join('')) return true;
  if (t1.map(r => r[0]).join('') === t2.map(r => r[r.length - 1]).join('')) return true;
  if (t1.map(r => r[r.length - 1]).join('') === t2.map(r => r[0]).join('')) return true;

  return false;
};

const checkTiles = (t1, t2) => {
  for (let o1 = 0; o1 < 360; o1 += 90) {
    for (let o2 = 0; o2 < 360; o2 += 90) {
      if (doTilesMatch(arrayTransform.rotate(t1, o1), arrayTransform.rotate(t2, o2))) return true;
    }
  }

  const f1 = arrayTransform.vflip(t1);
  for (let o1 = 0; o1 < 360; o1 += 90) {
    for (let o2 = 0; o2 < 360; o2 += 90) {
      if (doTilesMatch(arrayTransform.rotate(f1, o1), arrayTransform.rotate(t2, o2))) return true;
    }
  }

  return false;
};

const tileMatchCount = new Map();
tileMap.forEach((tile, key) => tileMatchCount.set(key, 0));

tileMap.forEach((t1, tk1) => {
  tileMap.forEach((t2, tk2) => {
    if (tk1 === tk2) return;
    if (checkTiles(t1, t2)) tileMatchCount.set(tk1, tileMatchCount.get(tk1) + 1);
  });
});

const cornerPieces = [];
tileMatchCount.forEach((count, tileId) => {
  if (count === 2) cornerPieces.push(tileId);
});

console.log(cornerPieces.reduce((acc, val) => acc *= val, 1));
