let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let msg = document.querySelector("#msg");
let msg_disp = document.querySelector(".msg-container");
let new_btn = document.querySelector("#new_btn");
let turn0 = true;

// Scores
let xScore = 0;
let oScore = 0;
let xScoreEl = document.querySelector("#x-score");
let oScoreEl = document.querySelector("#o-score");

// Player Names
let playerOName = "Player O";
let playerXName = "Player X";
const playerOInput = document.querySelector("#player-o");
const playerXInput = document.querySelector("#player-x");
const setNamesBtn = document.querySelector("#set-names");
const playerONameEl = document.querySelector("#player-o-name");
const playerXNameEl = document.querySelector("#player-x-name");

// Set Names
setNamesBtn.addEventListener("click", () => {
  if (playerOInput.value.trim() !== "") {
    playerOName = playerOInput.value;
  }
  if (playerXInput.value.trim() !== "") {
    playerXName = playerXInput.value;
  }
  playerONameEl.innerHTML = `${playerOName} (O) Wins: <span id="o-score">${oScore}</span>`;
  playerXNameEl.innerHTML = `${playerXName} (X) Wins: <span id="x-score">${xScore}</span>`;
  oScoreEl = document.querySelector("#o-score");
  xScoreEl = document.querySelector("#x-score");
});

// Reset Game (clears board + resets scores)
const resetGame = () => {
  xScore = 0;
  oScore = 0;
  xScoreEl.innerText = xScore;
  oScoreEl.innerText = oScore;
  newGame();
};

// New Game (only clears board, keeps scores)
const newGame = () => {
  enableBoxes();
  msg_disp.classList.remove("show");
  turn0 = true;
};

const winPatterns = [
  [0,1,2],[0,3,6],[0,4,8],
  [1,4,7],[2,5,8],[2,4,6],
  [3,4,5],[6,7,8]
];

// Box click logic
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn0) {
      box.innerText = "O";
      turn0 = false;
    } else {
      box.innerText = "X";
      turn0 = true;
    }
    box.disabled = true;
    checkWinner();
  });
});

// Enable & Disable Boxes
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

// Show Winner
const showWinner = (Winner) => {
  let winnerName = Winner === "X" ? playerXName : playerOName;
  msg.innerText = `🎉 Congratulations! Winner is: ${winnerName}`;
  msg_disp.classList.add("show");

  if (Winner === "X") {
    xScore++;
    xScoreEl.innerText = xScore;
  } else if (Winner === "O") {
    oScore++;
    oScoreEl.innerText = oScore;
  }

  disableBoxes();
};

// Check Winner
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        showWinner(pos1val);
      }
    }
  }
};

// Button Events
new_btn.addEventListener("click", newGame);
resetBtn.addEventListener("click", resetGame);
