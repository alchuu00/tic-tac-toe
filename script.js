const gameBoard = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

function createPlayer(name, symbol) {
  return {
    name: name,
    symbol: symbol,
  };
}
let player1 = createPlayer('Player 1', 'X');
let player2 = createPlayer('Player 2', 'O');

const getRow = () => {
  return parseInt(prompt('input row number'));
};

const getColumn = () => {
  return parseInt(prompt('input column number'));
};

const updateBoard = (row, col) => {
  gameBoard[row][col] = currentPlayer.symbol;
};

const switchPlayer = () => {
  if (currentPlayer === player1) {
    currentPlayer = player2;
  } else {
    currentPlayer = player1;
  }
};


