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
      const cell = {
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
  for (let row = 0; row < board.length; row++) {
    //every column (width)
    for (let col = 0; col < board[0].length; col++) {
      board[row][col].isMine = false;
      board[row][col].neighbors = 0;
      board[row][col].isOpen = false;
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
    let row = Math.floor(Math.random() * board.length); //Random num of rows
    let col = Math.floor(Math.random() * board[0].length); //Random num of columns
    //If in the cell of board[row][col].isMine === false
    if (!board[row][col].isMine) {
      board[row][col].isMine = true; //set it to be true
      calculateNeighbors(row, col);
      numMines--; //decrease the number of mines we have left to assigned
    }
  }
}

function calculateNeighbors(row, col) {
  //console.log(`calculateNeighbors(${row}, ${col})`);
  for (let i = -1; i <= 1; i++) { //O(3) MAX
    if (row + i >= 0 && row + i < board.length) { //O(1)
      for (let j = -1; j <= 1; j++) { //O(3) MAX
        if (col + j >= 0 && col + j < board[0].length) { //O(1)
          if (!board[row + i][col + j].isMine) { //O(1)
            board[row + i][col + j].neighbors++;
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

const cellClicked = (row, col) => {
  //console.log(`row= ${row}  col= ${col}`);
  board[row][col].isOpen = true;
  if (board[row][col].isMine) {
    gameOver();
    render();
    return;
  }
  if (board[row][col].neighbors > 0) {
    render();
    return;
  }

  for (let i = -1; i <= 1; i++) {
    if (row + i >= 0 && row + i < board.length) {
      for (let j = -1; j <= 1; j++) {
        if (col + j >= 0 && col + j < board[0].length) {
          // console.log(`cellClicked(${row + i}, ${col + j})`);
          if (!board[row + i][col + j].isOpen) {
            board[row + i][col + j].isOpen = true;
            console.log(`line 120 cellClicked(${row + i}, ${col + j})`);
            cellClicked(row + i, col + j);
          }
        }
      }
    }
  }
  return;
};



function getCellClicked(row, col) {
  return function () {
    cellClicked(row, col);
  };
}


function init() {

}

function render() {
  const boardElement = document.getElementById("game");
  boardElement.innerHTML = "";
  console.log(boardElement);
  board.forEach((row, ri) => {
    let rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    row.forEach((cell, ci) => {
      let cellDiv = document.createElement("div");
      //cell.isOpen = true;

      if (!cell.isOpen) {
        cellDiv.classList.add("close");
      } else {
        if (cell.isMine) {
          cellDiv.classList.add("mine-open");
        } else {
          cellDiv.classList.add("open");
          if (cell.neighbors > 0 && !cell.isMine) {
            let neighborDiv = document.createElement("span");
            neighborDiv.classList.add("neighbors" + "-" + cell.neighbors);
            neighborDiv.innerHTML = cell.neighbors;
            cellDiv.appendChild(neighborDiv);
          }
        }
      }

      cellDiv.addEventListener("click", getCellClicked(ri, ci));
      rowDiv.appendChild(cellDiv);
    });
    boardElement.appendChild(rowDiv);
  });
}

initBoard(9, 9);
populateMines(10);
render();
