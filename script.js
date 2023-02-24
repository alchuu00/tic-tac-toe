function createPlayer(name, symbol) {
  return {
    name,
    symbol,
  };
}

const createGameboard = () => [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

const getRow = (currentPlayer) => parseInt(prompt(`${currentPlayer.name} input row number`));

const getColumn = (currentPlayer) => parseInt(prompt(`${currentPlayer.name} input column number`));

const updateBoard = (row, col, currentPlayer, gameboard) => {
  // copy the gameboard
  const gameboardCopy = gameboard.map((row) => [...row]);
  // modify the copy
  gameboardCopy[row][col] = currentPlayer.symbol;

  // return the copy
  return gameboardCopy;
};

const takeATurn = (gameboard, currentPlayer) => {
  const newGameboard = updateBoard(
    getRow(currentPlayer),
    getColumn(currentPlayer),
    currentPlayer,
    gameboard,
  );
  return newGameboard;
};

const getNextPlayer = (currentPlayer, player1, player2) => {
  if (currentPlayer === player1) {
    return player2;
  }
  return player1;
};

const checkForWinner = (newGameboard) => {
  const winningCombinations = [
    // Rows
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],

    // Columns
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],

    // Diagonals
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]],
  ];
debugger
  for (let i = 0; i < winningCombinations.length; i++) {
    const combo = winningCombinations[i];
    const [row1, col1] = combo[0];
    const [row2, col2] = combo[1];
    const [row3, col3] = combo[2];
    const square1 = newGameboard[row1][col1];
    const square2 = newGameboard[row2][col2];
    const square3 = newGameboard[row3][col3];

    if (square1 && square1 === square2 && square1 === square3) {
      console.log('you won');
      return true;
    }
  }

  // Check for a draw
  let isDraw = true;
  for (let i = 0; i < newGameboard.length; i++) {
    for (let j = 0; j < newGameboard[i].length; j++) {
      if (newGameboard[i][j] === 0) {
        isDraw = false;
        break;
      }
    }
    if (!isDraw) {
      break;
    }
  }
  if (isDraw) {
    console.log('The game ended in a draw');
    return true;
  }

  return false;
};

(function controller() {
  const player1 = createPlayer('Player 1', 'X');
  const player2 = createPlayer('Player 2', 'O');

  let currentPlayer = player1;

  // set up initial board
  let gameboard = createGameboard();

  // game loop
  // 1. take a turn
  // 2. check if there's a winner
  // 3. if not, repeat
  let gameOver = false;

  while (!gameOver) {
    const newGameboard = takeATurn(gameboard, currentPlayer);
    gameboard = newGameboard;
    gameOver = checkForWinner(newGameboard);
    currentPlayer = getNextPlayer(currentPlayer, player1, player2);
  }
}());
