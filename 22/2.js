const fs = require('fs');

const startingDecks = fs.readFileSync('./input.txt')
  .toString('utf-8')
  .split("\n\n")
  .map(decks => decks
    .split("\n")
    .filter(row => row)
    .splice(1)
    .map(card => parseInt(card)));

const playRound = (player1Deck, player2Deck) => {
  console.log(`Player 1's deck: ${player1Deck.join(', ')}`);
  console.log(`Player 2's deck: ${player2Deck.join(', ')}`);

  const player1Play = player1Deck.splice(0, 1).pop();
  const player2Play = player2Deck.splice(0, 1).pop();

  console.log(`Player 1 plays: ${player1Play}`);
  console.log(`Player 2 plays: ${player2Play}`);

  let winner;

  if (
    player1Deck.length >= player1Play &&
    player2Deck.length >= player2Play
  ) {
    console.log('Playing a sub-game to determine the winner...');
    console.log('');

    const player1CloneDeck = player1Deck.slice(0, player1Play);
    const player2CloneDeck = player2Deck.slice(0, player2Play);

    playGame(player1CloneDeck, player2CloneDeck);

    winner = (player1CloneDeck.length > 0) ? 1 : 2;
  } else {
    winner = (player1Play > player2Play) ? 1 : 2;
  }

  if (winner === 1) {
    console.log(`Player 1 wins the round of game ${game}!`);

    player1Deck.splice(player1Deck.length, 0, player1Play, player2Play);
  } else {
    console.log(`Player 2 wins the round of game ${game}!`);

    player2Deck.splice(player2Deck.length, 0, player2Play, player1Play);
  }

  console.log('');
}

let game = 0;
const playGame = (player1Deck, player2Deck) => {
  const gameMemory = [];
  let round = 0;

  game++;
  while (true) {
    const savedRound = `${player1Deck.join(',')}|${player2Deck.join(',')}`;
    if (gameMemory.includes(savedRound)) {
      console.log('found previous match');
      break; // hack, game is recursive and ends early, throwing to player 1
    }

    gameMemory.push(savedRound);

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

    round++;

    console.log(`-- Round ${round} (Game ${game}) --`);

    playRound(player1Deck, player2Deck);
  }
};

const player1Deck = startingDecks[0];
const player2Deck = startingDecks[1];

playGame(player1Deck, player2Deck);

const winningDeck = (player1Deck.length > 0) ? player1Deck : player2Deck;

console.log(winningDeck.reduce((acc, val, ind) => acc + val * (winningDeck.length - ind), 0));
