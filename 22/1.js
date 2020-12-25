const fs = require('fs');

const startingDecks = fs.readFileSync('./input.txt')
  .toString('utf-8')
  .split("\n\n")
  .map(decks => decks
    .split("\n")
    .filter(row => row)
    .splice(1)
    .map(card => parseInt(card)));

let round = 0;
const playRound = (player1Deck, player2Deck) => {
  round++;

  console.log(`-- Round ${round} --`);

  console.log(`Player 1's deck: ${player1Deck.join(', ')}`);
  console.log(`Player 2's deck: ${player2Deck.join(', ')}`);

  const player1Play = player1Deck.splice(0, 1).pop();
  const player2Play = player2Deck.splice(0, 1).pop();

  console.log(`Player 1 plays: ${player1Play}`);
  console.log(`Player 2 plays: ${player2Play}`);

  if (player1Play > player2Play) {
    console.log('Player 1 wins the round!');

    player1Deck.splice(player1Deck.length, 0, player1Play, player2Play);
  } else {
    console.log('Player 2 wins the round!');

    player2Deck.splice(player2Deck.length, 0, player2Play, player1Play);
  }

  console.log('');
}

const player1Deck = startingDecks[0];
const player2Deck = startingDecks[1];

while (true) {
  if (
    player1Deck.length === 0 ||
    player2Deck.length === 0
  ) {
    console.log('');
    console.log('== Post-game results ==');

    console.log(`Player 1's deck: ${player1Deck.join(', ')}`);
    console.log(`Player 2's deck: ${player2Deck.join(', ')}`);
    break;
  }

  playRound(player1Deck, player2Deck);
}

const winningDeck = (player1Deck.length > 0) ? player1Deck : player2Deck;

console.log(winningDeck.reduce((acc, val, ind) => acc + val * (winningDeck.length - ind), 0));
