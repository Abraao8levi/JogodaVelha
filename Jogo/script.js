const cells = document.querySelectorAll('.cell');
const gameStatus = document.getElementById('game-status');
const resetButton = document.getElementById('reset-button');
const startButton = document.getElementById('start-button');
const menu = document.querySelector('.menu');
const instructions = document.querySelector('.instructions');
const game = document.querySelector('.game');

let currentPlayer = 'X';
let gameBoard = Array(9).fill(null);
let isGameActive = true;
let moveCount = { 'X': 0, 'O': 0 };
const maxMoves = 4;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWinner() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            isGameActive = false;
            gameStatus.textContent = `Jogador ${gameBoard[a]} venceu!`;
            return;
        }
    }

    if (!gameBoard.includes(null)) {
        isGameActive = false;
        gameStatus.textContent = 'Empate!';
    }
}

function handleCellClick(event) {
    const cellIndex = event.target.getAttribute('data-index');

    if (gameBoard[cellIndex] || !isGameActive || moveCount[currentPlayer] >= maxMoves) {
        return;
    }

    gameBoard[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;
    moveCount[currentPlayer]++;
    checkWinner();

    if (isGameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        gameStatus.textContent = `Vez do jogador ${currentPlayer}`;
    }
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard.fill(null);
    isGameActive = true;
    moveCount = { 'X': 0, 'O': 0 };
    gameStatus.textContent = `Vez do jogador ${currentPlayer}`;
    cells.forEach(cell => (cell.textContent = ''));
}

function startGame() {
    menu.classList.remove('active');
    instructions.classList.add('active');
    setTimeout(() => {
        instructions.classList.remove('active');
        game.classList.add('active');
        resetGame();
    }, 3000); // Exibe as instruções por 3 segundos
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
startButton.addEventListener('click', startGame);

// Inicializa o estado do jogo
gameStatus.textContent = `Vez do jogador ${currentPlayer}`;
menu.classList.add('active');
