function createPlayer(name, symbol) {
  return {
    name: name,
    symbol: symbol,
  };
}

const createGameBoard = () => {
  return [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
};

const getRow = () => {
  return parseInt(prompt('input row number'));
};

const getColumn = () => {
  return parseInt(prompt('input column number'));
};

const updateBoard = (row, col, currentPlayer, gameboard) => {
  // copy the gameboard
  const gameboardCopy = Object.assign({}, gameboard); // make a copy of an object
  // modify the copy
  gameboardCopy[row][col] = currentPlayer.symbol;
  // return the copy
  return gameboardCopy;
};

const getNextPlayer = (currentPlayer, player1, player2) => {
  if (currentPlayer === player1) {
    return player2;
  } else {
    return player1;
  }
};

(function controller() {
  const player1 = createPlayer('Player 1', 'X');
  const player2 = createPlayer('Player 2', 'O');

  let currentPlayer = player1;

  // set up initial board
  let gameboard = createGameBoard();
  console.log(
    '🚀 ~ file: script.js:49 ~ controller ~ gameboard:',
    JSON.stringify(gameboard)
  );

  // game loop
  // 1. take a turn
  // 2. check if there's a winner
  // 3. if not, repeat
  let gameOver = false;
  debugger;
  while (!gameOver) {
    const newGameboard = takeATurn(gameboard, currentPlayer);
    gameboard = newGameboard;
    gameOver = checkForWinner();
    currentPlayer = getNextPlayer(currentPlayer, player1, player2);
  }
})();

function takeATurn(gameboard, currentPlayer) {
  const newGameBoard = updateBoard(
    getRow(),
    getColumn(),
    currentPlayer,
    gameboard
  );
  return newGameBoard;
}

function checkForWinner() {
  // TODO
  return false;
}
