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
        x: j,
        y: i,
        id: j + "" + i,
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
    if (y + i >= 0 && y + i < board.length) {
      for (let j = -1; j <= 1; j++) {
        if (x + j >= 0 && x + j < board[0].length) {
          if (!board[y + i][x + j].isMine) {
            board[y + i][x + j].neighbors++;
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
    })
  });
}

const cellClicked = (x, y) => {

  if (board[x][y].isMine) {
    gameOver();
    render();
    return;
  }
  if (board[x][y].neighbors > 0 && !board[x][y].isOpen) {
    board[x][y].isOpen = true;
    render();
    return;
  }
  board[x][y].isOpen = true;
  for (let i = -1; i <= 1; i++) {
    let xi = x + i;
    if (xi >= 0 && xi < board.length) {
      for (let j = -1; j <= 1; j++) {
        let yj = y + j;
        if (yj >= 0 && yj < board[0].length) {
          if (!board[xi][yj].isOpen) {
            //board[x + i][y + j].isOpen = true;
            //console.log(`${JSON.stringify(board[x + i][y + j])} x+i= ${x + i} y+j=${y + j}`);
            cellClicked(xi, yj);
          }

        }
      }
    }
  }
  //return;
}


const memoize = (fn) => {
  const cache = {};
  return (...args) => {
    const key = JSON.stringify(args);
    if (key in cache) {
      console.log(cache[key]);
      return cache[key];
    }
    else {
      cache[key] = fn(...args);
      return cache[key];
    }

  }

}

function getCellClicked(x, y, cell) {
  return function () {
    //const clickedRec = memoize(cellClicked);
    console.log(`x=${x} y= ${y} `);
    console.log(cell);
    cellClicked(x, y);

  }
}

function render() {
  const boardElement = document.getElementById("game");
  boardElement.innerHTML = "";

  board.forEach((col, x) => {
    let colDiv = document.createElement('div');
    col.forEach((cell, y) => {
      let cellDiv = document.createElement('div');
      if (!cell.isOpen) {
        cellDiv.classList.add('close');
        //console.log(`x= ${x}  y=${y}`);
        //console.log(cellDiv);
      } else {
        if (cell.isMine) {
          cellDiv.classList.add('mine-open')
        } else {
          cellDiv.classList.add('open');
        }
      }

      if (cell.isOpen && cell.neighbors > 0 && !cell.isMine) {
        cellDiv.innerHTML = cell.neighbors;
      }
      cellDiv.addEventListener('click', getCellClicked(x, y, this));
      colDiv.appendChild(cellDiv);
    });
    boardElement.appendChild(colDiv);
  });
}

initBoard(9, 9);
populateMines(10);
render();
