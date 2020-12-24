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
  if (t1[0].join('') === t2[t2.length - 1].join('')) return 't';
  if (t1[t1.length - 1].join('') === t2[0].join('')) return 'b';
  if (t1.map(r => r[0]).join('') === t2.map(r => r[r.length - 1]).join('')) return 'l';
  if (t1.map(r => r[r.length - 1]).join('') === t2.map(r => r[0]).join('')) return 'r';

  return '';
};

const checkTiles = (t1, t2) => {
  let match = '';

  for (let o2 = 0; o2 < 360; o2 += 90) {
    match = doTilesMatch(t1, arrayTransform.rotate(t2, o2));
    if (match !== '') {
      return {
        t1: t1,
        t2: arrayTransform.rotate(t2, o2),
        locale: match,
      };
    }
  }

  const f2 = arrayTransform.hflip(t2);
  for (let o2 = 0; o2 < 360; o2 += 90) {
    match = doTilesMatch(t1, arrayTransform.rotate(f2, o2));
    if (match !== '') {
      return {
        t1: t1,
        t2: arrayTransform.rotate(f2, o2),
        locale: match,
      };
    }
  }

  return;
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

const dim = Math.sqrt(tileMap.size);
const image = [];
for (let x = 0; x < dim; x++) {
  image.push([]);
  for (let y = 0; y < dim; y++) {
    image[x].push({});
  }
}

cornerPiece = cornerPieces[0];

const adjacentPieces = [];
tileMap.forEach((t, k) => {
  if (k === cornerPiece) return;
  const checkTileResult = checkTiles(tileMap.get(cornerPiece), t);
  if (checkTileResult) adjacentPieces.push(checkTileResult);
});

const startX = (adjacentPieces.map(piece => piece.locale).includes('l')) ? dim - 1 : 0;
const startY = (adjacentPieces.map(piece => piece.locale).includes('b')) ? dim - 1 : 0;

image[startY][startX] = {
  id: cornerPiece,
  tile: arrayTransform.vflip(tileMap.get(cornerPiece)), // manually. yay.
};

for (let y = 0; Math.abs(y) < dim; y += (startY === 0 ? 1 : -1)) {
  for (let x = 0; Math.abs(x) < dim; x += (startX === 0 ? 1 : -1)) {
    const tile = image[startY + y][startX + x];
    tileMap.forEach((t, k) => {
      if (k === tile.id) return;
      const checkTileResult = checkTiles(tile.tile, t);
      if (checkTileResult) {
        if (checkTileResult.locale === 'r') {
          image[startY + y][startX + x + 1] = {
            id: k,
            tile: checkTileResult.t2,
          };
        } else if (checkTileResult.locale === 'l') {
          image[startY + y][startX + x - 1] = {
            id: k,
            tile: checkTileResult.t2,
          };
        } else if (checkTileResult.locale === 'b') {
          image[startY + y + 1][startX + x] = {
            id: k,
            tile: checkTileResult.t2,
          }
        } else if (checkTileResult.locale === 't') {
          image[startY + y - 1][startX + x] = {
            id: k,
            tile: checkTileResult.t2,
          }
        } else {
          console.log(checkTileResult);
        }
      }
    });
  }
}

const output = [];
for (let y = 0; y < dim; y++) {
  for (let x = 0; x < dim; x++) {
    const tile = image[y][x];
    tile.tile.forEach((row, tileRow) => {
      if (tileRow === 0 || tileRow === 9) return;

      if (x === 0) {
        // output.push(row.join(''));
        output.push(row.slice(1, -1).join(''));
      } else {
        // output[tileRow + (y * tile.tile.length) + y] += ' | ' + row.join('');
        output[(tileRow - 1) + (y * 8)] += row.slice(1, -1).join('');
      }
    });
  }
  // output.push(' ---------------------------------- ');
}

// console.log(output);
// throw new Error('no more');

const seaMonster = [
  '                  #',
  '#    ##    ##    ###',
  ' #  #  #  #  #  #',
];

const foundSeaMonster = (testImage, offsetY, offsetX) => {
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 20; x++) {
      if (seaMonster[y].length < x || seaMonster[y][x] === ' ') continue;
      if (testImage[offsetY + y][offsetX + x] !== '#') return false;
    } 
  }
  return true;
};

const searchTestImage = (testImage) => {
  let seaMonsters = 0;
  for (let y = 0; y < (testImage.length - 3); y++) {
    for (let x = 0; x < (testImage[0].length - 20); x++) {
      if (foundSeaMonster(testImage, y, x)) seaMonsters++;
    }
  }

  return seaMonsters;
};

const peruseImage = () => {
  for (let o2 = 0; o2 < 360; o2 += 90) {
    const seaMonsters = searchTestImage(arrayTransform.rotate(output, o2));
    if (seaMonsters > 0) {
console.log(seaMonsters);
//      return seaMonsters;
    }
  }

console.log('flip');
  for (let o2 = 0; o2 < 360; o2 += 90) {
    const seaMonsters = searchTestImage(arrayTransform.rotate(arrayTransform.hflip(output), o2));
    if (seaMonsters > 0) {
console.log(seaMonsters);
//      return seaMonsters;
    }
  }

  throw new Error('nothing worked');
};

const numberOfSeaMonsters = peruseImage();
const numberOfWaves = output.reduce((acc, val) => acc += val.match(/#/g).length, 0);

console.log(numberOfWaves - numberOfSeaMonsters * 15);
