window.addEventListener('DOMContentLoaded', () => {
    const tiles = document.querySelectorAll('.tile');
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    let board = Array(9).fill('');
    let currentPlayer = 'X';
    let isGameActive = true;

    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    const announce = (type) => {
        const messages = {
            'PLAYERX_WON': 'Player <span class="playerX">X</span> Won',
            'PLAYERO_WON': 'Player <span class="playerO">O</span> Won',
            'TIE': 'Tie'
        };
        announcer.innerHTML = messages[type];
        announcer.classList.remove('hide');
    };

    const updateBoard = (index) => board[index] = currentPlayer;

    const changePlayer = () => {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
    };

    const isValidAction = (tile) => tile.innerText === '';

    const handleResultValidation = () => {
        for (let [a, b, c] of winningConditions) {
            if (board[a] && board[a] === board[b] && board[b] === board[c]) {
                announce(currentPlayer === 'X' ? 'PLAYERX_WON' : 'PLAYERO_WON');
                isGameActive = false;
                return;
            }
        }
        if (!board.includes('')) announce('TIE');
    };

    const userAction = (tile, index) => {
        if (isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    };

    const resetBoard = () => {
        board.fill('');
        isGameActive = true;
        announcer.classList.add('hide');
        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX', 'playerO');
        });
    };

    tiles.forEach((tile, index) => tile.addEventListener('click', () => userAction(tile, index)));
    resetButton.addEventListener('click', resetBoard);
});
