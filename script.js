const gridSize = 5;
let grid = [];
let timer;
let seconds = 0;
let moves = 0;
let gameStarted = false;

function createGrid() {
    const gridContainer = document.getElementById('gridContainer');
    gridContainer.innerHTML = '';

    for (let i = 0; i < gridSize; i++) {
        grid[i] = [];
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement('div');
            cell.className = 'grid-item';
            cell.addEventListener('click', () => toggleLights(i, j));
            // Initialize the grid with random values (true or false)
            grid[i][j] = Math.random() < 0.5;
            gridContainer.appendChild(cell);
            updateCell(i, j);
        }
    }
}

function toggleLights(row, col) {
    if (!gameStarted) {
        return; // Exit the function if the game has not started
    }

    toggleCell(row, col);
    toggleCell(row - 1, col);
    toggleCell(row + 1, col);
    toggleCell(row, col - 1);
    toggleCell(row, col + 1);

    moves++;
    updateMoves();
    checkWin();
}

function toggleCell(row, col) {
    if (row >= 0 && row < gridSize && col >= 0 && col < gridSize) {
        grid[row][col] = !grid[row][col];
        updateCell(row, col);
    }
}

function updateCell(row, col) {
    const cell = document.getElementsByClassName('grid-item')[row * gridSize + col];
    cell.style.backgroundColor = grid[row][col] ? '#333' : '#eee';
}

function updateMoves() {
    document.getElementById('moves').textContent = 'Moves: ' + moves;
}

function startTimer() {
    timer = setInterval(() => {
        seconds++;
        const formattedTime = formatTime(seconds);
        document.getElementById('timer').textContent = 'Time: ' + formattedTime;
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
    return formattedMinutes + ':' + formattedSeconds;
}

function checkWin() {
    if (grid.every(row => row.every(cell => !cell))) {
        stopTimer();
        alert('Congratulations! You won in ' + moves + ' moves and ' + formatTime(seconds) + '.');
        resetGame();
    }
}

function startGame() {
    moves = 0;
    seconds = 0;
    updateMoves();
    createGrid();
    startTimer();
    gameStarted = true;
}

function resetGame() {
    stopTimer();
    createGrid();
    document.getElementById('timer').textContent = 'Time: 00:00';
    moves = 0;
    updateMoves();
    gameStarted = false;
}

// Initial setup
createGrid();
