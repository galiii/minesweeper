const smilyBtn = document.getElementById("smileBtn");
let board; //

smilyBtn.addEventListener("click", function () {
  initBoard(9, 9);
  populateMines(10);
  render();
});

/**
 * Two dimension -
 *   for example if we have bord with: 3X3 :
 *  board = [[{1},{2},{3}],
 *           [{4},{5},{6}],
 *           [{7},{8},{9}]]
 * @param {number} width
 * @param {number} height
 */
function initBoard(width, height) {
  board = []; //reset the board for a new game
  for (let i = 0; i < height; i++) {
    let row = []; //reset for the next row
    for (let j = 0; j < width; j++) {
      //cell is an object that return have the next proprties
      let cell = {
        isOpen: false, //Boolean value that tell me if the user open the cell (by Click event)
        isMine: false, //Boolean value that tell me if there is a Mine
        isFlag: false, //Boolean value that tell me if the User put a flag in this cell
        neighbors: 0
      };
      row.push(cell); //have the cell object (item) to the row in other words row[i][j] = cell
    }
    board.push(row); //row[i] = [{cell},{cell},{cell}]
  }
}

/**
 * The purpose of this function is :
 * to reset isMine = false
 * for every cell in the board
 **/
function clearBoard() {
  //every row (height)
  for (let x = 0; x < board.length; x++) {
    //every column (width)
    for (let y = 0; y < board[0].length; y++) {
      board[x][y].isMine = false;
      board[x][y].neighbors = 0;
    }
  }
}

/**
 * The purpose of this function is to populate the Mines
 * @param {number} numMines - witch will be on the board
 */
function populateMines(numMines) {
  clearBoard(); //Reset - isMine  the property of cell for a new game
  //The run time of this function is O(numMines)
  while (numMines > 0) {
    //while there are still mines that we didn't populate
    let y = Math.floor(Math.random() * board.length); //Random num of rows
    let x = Math.floor(Math.random() * board[0].length); //Random num of columns
    //If in the cell of board[x][y].isMine === false
    if (!board[y][x].isMine) {
      board[y][x].isMine = true; //set it to be true
      calculateNeighbors(y, x);
      numMines--; //decrease the number of mines we have left to assigned
    }
  }
}

function calculateNeighbors(x, y) {
  for (let i = -1; i <= 1; i++) {
    if (x + i >= 0 && x + i < board.length) {
      for (let j = -1; j <= 1; j++) {
        if (y + j >= 0 && y + j < board[0].length) {
          if (!board[x + i][y + j].isMine) {
            board[x + i][y + j].neighbors++;
          }
        }
      }
    }
  }
}

function gameOver() {
  board.forEach(function (col) {
    col.forEach(function (cell) {
      cell.isOpen = true;
    });
  });
}

const cellClicked = (x, y) => {
  //console.log(`x= ${x}  y= ${y}`);
  board[x][y].isOpen = true;
  if (board[x][y].isMine) {
    gameOver();
    render();
    return;
  }
  if (board[x][y].neighbors > 0) {
    render();
    return;
  }

  for (let i = -1; i <= 1; i++) {
    if (x + i >= 0 && x + i < board.length) {
      for (let j = -1; j <= 1; j++) {
        if (y + j >= 0 && y + j < board[0].length) {
          if (!board[x + i][y + j].isOpen) {
            cellClicked(x + i, y + j);
          }
        }
      }
    }
  }
  return;
};

const memoize = fn => {
  const cache = {};
  return (...args) => {
    const key = JSON.stringify(args);
    return key in cache ? cache[key] : (cache[key] = fn(...args));
  };
};

function getCellClicked(x, y) {
  return function () {
    //const clickedRec = memoize(cellClicked);
    //console.log(`y= ${y}`);
    cellClicked(x, y);
  };
}

function render() {
  const boardElement = document.getElementById("game");
  boardElement.innerHTML = "";

  board.forEach((col, x) => {
    let colDiv = document.createElement("div");
    col.forEach((cell, y) => {
      let cellDiv = document.createElement("div");
      if (!cell.isOpen) {
        cellDiv.classList.add("close");
      } else {
        if (cell.isMine) {
          cellDiv.classList.add("mine-open");
        } else {
          cellDiv.classList.add("open");
          if (cell.neighbors > 0 && !cell.isMine) {
            colors = [{ num: 1, color: "#569cdc" },
            { num: 2, color: "#32e267" },
            { num: 3, color: "#ca3b3a" },
            { num: 4, color: "#c25be4" },
            { num: 5, color: "#569cdc" }];

            if (cell.neighbors == 1) {
              cellDiv.style.color = "#569cdc";
            }

            else if (cell.neighbors == 2) {
              cellDiv.style.color = "#32e267";
            }

            else if (cell.neighbors == 3) {
              cellDiv.style.color = "#ca3b3a";
            }

            else if (cell.neighbors == 4) {
              cellDiv.style.color = "#c25be4";
            }
            cellDiv.innerHTML = cell.neighbors;
          }
        }
      }


      cellDiv.addEventListener("click", getCellClicked(x, y));
      colDiv.appendChild(cellDiv);
    });
    boardElement.appendChild(colDiv);
  });
}

initBoard(9, 9);
populateMines(10);
render();
