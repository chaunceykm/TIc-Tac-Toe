const key = "tic-tac-toe-game-state";
document.addEventListener("DOMContentLoaded", () => {
    loadGameState();
    console.log(board);
    // updateAndRender();
    updateView();

  document.getElementById("tic-tac-toe").addEventListener("click", (evt) => {
    const targetId = evt.target.id;
    if (!targetId.startsWith("square-")) return;

    const index = Number.parseInt(targetId[targetId.length - 1]);
    updateAndRender(index);
  });
  document.getElementById("new-game").addEventListener("click", () => {
    updateAndRender(null, true);
  });
  document.getElementById("give-up").addEventListener("click", () => {
    updateAndRender(null, false, true);
  });
  
});

function saveGameState() {
    const state = {
        currentPlayerSymbol, 
        board, 
        gameStatus, 
    };

    window.localStorage.setItem(key, JSON.stringify(state));  
}
function loadGameState() {
    const savedState = window.localStorage.getItem(key); 
    if (savedState === null) return; 
    
    const state = JSON.parse(savedState); 
    currentPlayerSymbol = state.currentPlayerSymbol; 
    board = state.board; 
    gameStatus = state.gameStatus; 
    console.log(state);
}

function updateAndRender(index, isNewGame, giveUp) {
  updateState(index, isNewGame, giveUp);
  updateView();
}

let currentPlayerSymbol;
let board;
let gameStatus;
function updateState(index, isNewGame, giveUp) {
  if (giveUp) {
    if (currentPlayerSymbol === "x") {
      gameStatus = "O";
    } else {
      gameStatus = "X";
    }
    return;
  }
  if (isNewGame) {
    currentPlayerSymbol = "x";
    board = ["", "", "", "", "", "", "", "", ""];
    gameStatus = "";
    return;
  }

  if (gameStatus !== "") return;

  board[index] = currentPlayerSymbol;

  for (let i = 0; i < 9; i += 3) {
    if (
      board[i] !== "" &&
      board[i] === board[i + 1] &&
      board[i] === board[i + 2]
    ) {
      gameStatus = board[i].toUpperCase();
      break;
    }
  }
  for (let i = 0; i < 3; i += 1) {
    if (
      board[i] !== "" &&
      board[i] === board[i + 3] &&
      board[i] === board[i + 6]
    ) {
      gameStatus = board[i].toUpperCase();
      break;
    }
  }

  if (board[0] !== "" && board[0] === board[4] && board[0] === board[8]) {
    gameStatus = board[0].toUpperCase();
  }
  if (board[2] !== "" && board[2] === board[4] && board[2] === board[6]) {
    gameStatus = board[2].toUpperCase();
  }
  let boardFilled = true;
  for (let i = 0; i < 9; i += 1) {
    if (board[i] === "") {
      boardFilled = false;
      break;
    }
  }
  if (boardFilled) {
    gameStatus = "Draw!";
  }

  if (currentPlayerSymbol === "x") {
    currentPlayerSymbol = "o";
  } else {
    currentPlayerSymbol = "x";
  }
  saveGameState();
}

function updateView() {
  for (let i = 0; i < 9; i += 1) {
    const square = document.getElementById(`square-${i}`);
    
    if (square.innerHTML.trim() === "" && board[i]) {
        const symbol = document.createElement('img');
      symbol.src = `https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-${board[i]}.svg`;
      square.appendChild(symbol);
    }
    if (board[i] === "" && square.innerHTML.trim() !== "") {
      square.innerHTML = "";
    }
  }
  if (gameStatus !== "") {
    document.getElementById("new-game").disabled = false;
    document.getElementById("give-up").disabled = true;
    document.getElementById("game-status").innerHTML = `Winner: ${gameStatus}`;
  } else {
    document.getElementById("new-game").disabled = true;
    document.getElementById("give-up").disabled = false;
    document.getElementById("game-status").innerHTML = "";
  }
}

updateAndRender(null, true);
