function createPlayer(name, symbol) {
  return {
    name,
    symbol,
  };
}

const createGameboard = () => {
  const squares = document.querySelectorAll('.square');
  return Array.from(squares);
};

const updateBoard = (square, currentPlayer) => {
  square.textContent = currentPlayer.symbol;
  square.setAttribute('id', `${currentPlayer.symbol}`);
  square.setAttribute('data-symbol', currentPlayer.symbol);
};

const computerTurn = (gameboard, square, currentPlayer) => {
  const emptySquares = gameboard.filter(square => !square.hasAttribute('data-symbol'));
  const randomIndex = Math.floor(Math.random() * emptySquares.length);
  const randomSquare = emptySquares[randomIndex];
  updateBoard(randomSquare, currentPlayer);
};

const getNextPlayer = (currentPlayer, player1, player2) => {
  if (currentPlayer === player1) {
    return player2;
  }
  return player1;
};

const checkForWinner = (gameboard) => {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Check each winning combination to see if it's present in the gameboard
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (
      gameboard[a].getAttribute('data-symbol')
      && gameboard[a].getAttribute('data-symbol')
        === gameboard[b].getAttribute('data-symbol')
      && gameboard[a].getAttribute('data-symbol')
        === gameboard[c].getAttribute('data-symbol')
    ) {
      return true;
    }
  }
  return false;
};

const displayPlayerWon = (currentPlayerName, modal, text) => {
  console.log('remove class hidden');
  modal.classList.remove('hidden');
  text.textContent = `${currentPlayerName} won!`;
};

const displayDraw = (modal, text) => {
  modal.classList.remove('hidden');
  text.textContent = "It's a draw!";
};

const restartGame = (modal, squares) => {
  const retryBtn = document.querySelector('.retry-btn');
  retryBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    console.log('retry btn clicked');
    squares.forEach((square) => {
      square.textContent = '';
      square.removeAttribute('data-symbol');
      square.removeAttribute('id');
    });
  });
};

(function gameController() {
  const player1 = createPlayer('Player 1', '✕');
  const player2 = createPlayer('Player 2', '♡');

  let currentPlayer = player1;

  // set up initial board
  const gameboard = createGameboard();

  // game loop
  // 1. take a turn
  // 2. check if there's a winner or a draw
  // 3. if not, repeat
  const squares = document.querySelectorAll('.square');
  const modal = document.querySelector('.modal-overlay');
  const text = document.querySelector('.modal > h2');
  let numTurnsTaken = 0;

  squares.forEach((square) => {
    square.addEventListener('click', () => {
      if (!square.hasAttribute('data-symbol')) {
        updateBoard(square, currentPlayer);
        numTurnsTaken++;

        if (checkForWinner(gameboard)) {
          console.log(`${currentPlayer.name} wins!`);
          displayPlayerWon(currentPlayer.name, modal, text);
          restartGame(modal, squares);
          numTurnsTaken = 0;
          return;
        }

        if (numTurnsTaken === squares.length) {
          console.log("It's a draw!");
          displayDraw(modal, text);
          restartGame(modal, squares);
          numTurnsTaken = 0;
          return;
        }

        currentPlayer = getNextPlayer(currentPlayer, player1, player2);

        if (currentPlayer === player2) {
          setTimeout(() => {
            computerTurn(gameboard, square, currentPlayer);
            numTurnsTaken++;

            if (checkForWinner(gameboard)) {
              console.log(`${currentPlayer.name} wins!`);
              displayPlayerWon(currentPlayer.name, modal, text);
              restartGame(modal, squares);
              numTurnsTaken = 0;
              return;
            }

            if (numTurnsTaken === squares.length) {
              console.log("It's a draw!");
              displayDraw(modal, text);
              restartGame(modal, squares);
              numTurnsTaken = 0;
              return;
            }

            currentPlayer = getNextPlayer(currentPlayer, player1, player2);
          }, 500);
        }
      }
    });
  });
}());

