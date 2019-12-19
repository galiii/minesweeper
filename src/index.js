const smilyBtn = document.getElementById("smileBtn");
let board; //
let mines;

/**
 * 
 */
smilyBtn.addEventListener("click", function () {
  //console.log("in the click event");
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
        i: i,
        j: j,
        id: i + " " + j,
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
    for (let col = 0; col < board[row].length; col++) {
      board[row][col].isMine = false;
      board[row][col].neighbors = 0;
    }
  }
}

/**
 * The purpose of this function is to populate the Mines
 * @param {number} numMines - witch will be on the board
 */
function populateMines(numMines) {
  mines = [];
  clearBoard(); //Reset - isMine  the property of cell for a new game
  //The run time of this function is O(numMines)
  while (numMines > 0) {
    //while there are still mines that we didn't populate
    let row = Math.floor(Math.random() * board.length); //Random num of rows
    let col = Math.floor(Math.random() * board[0].length); //Random num of columns
    //If in the cell of board[x][y].isMine === false
    if (!board[row][col].isMine) {
      board[row][col].isMine = true; //set it to be true
      board[row][col].isOpen = true;
      numMines--; //decrease the number of mines we have left to assigned
      //mines.push({ y: y, x: x });
      calculateNeighbors(row, col);
    }
  }

}

function calculateNeighbors(row, col) {

  console.log(`in calculateNeighbors(${row},${col})`);
  if (row - 1 >= 0) {
    if (col - 1 >= 0) {
      board[row - 1][col - 1].neighbors++;
      console.log(`(${row - 1}, ${col - 1}) The Number of neighbore ${board[row - 1][col - 1].neighbors}`);
    }
    if (col + 1 < board[0].length) {
      board[row - 1][col + 1].neighbors++;
      console.log(`(${row - 1}, ${col + 1}) The Number of neighbore ${board[row - 1][col + 1].neighbors}`);
    }
    board[row - 1][col].neighbors++;
    console.log(`(${row - 1}, ${col}) The Number of neighbore ${board[row - 1][col].neighbors}`);
  }

  if (row + 1 < board.length) {
    if (col - 1 >= 0) {
      board[row + 1][col - 1].neighbors++;
      console.log(`(${row + 1}, ${col - 1}) The Number of neighbore ${board[row + 1][col - 1].neighbors}`);
    }
    if (col + 1 < board[0].length) {
      board[row + 1][col + 1].neighbors++;
      console.log(`${row + 1} ${col + 1} The Number of neighbore ${board[row + 1][col + 1].neighbors}`);
    }
    board[row + 1][col].neighbors++;
    console.log(`(${row + 1}, ${col}) The Number of neighbore ${board[row + 1][col].neighbors}`);
  }

  if (col + 1 < board[0].length) {
    board[row][col + 1].neighbors++;
    console.log(`(${row}, ${col + 1}) The Number of neighbore ${board[row][col + 1].neighbors}`);
  }

  if (col - 1 >= 0) {
    board[row][col - 1].neighbors++;
    console.log(`(${row}, ${col - 1}) The Number of neighbore ${board[row][col - 1].neighbors}`);
  }


}



/**
 * Help function for styling
 * if Cell is open we have 2 Qustion
 * if it's Mine we have class of mine
 * and if it's not only open
 * @param {number} i index of the row
 * @param {nunber} j index of the column
 * @returns an Object Cell / <div>
 */
function openCell(row, col) {
  let cell = document.createElement("div");
  cell.classList.add("open");
  board[row][col].isMine ?
    cell.classList.add("mine") :
    cell.classList.add("open");
  cell.id = board[row][col].id;
  return cell;
}

/*
Help function for styling 
if Cell is Close we have 2 Question
if it's Flag we have class of mine
and if it's not only opens
*/
function closeCell(row, col) {
  let cell = document.createElement("div");
  cell.classList.add("close");
  board[row][col].Flag ?
    cell.classList.add("flag") :
    cell.classList.add("close");
  cell.id = board[row][col].id;
  return cell;
}

/**
 * 
 */
function render() {
  const boardElement = document.getElementById("game"); //
  boardElement.innerHTML = "";
  for (let row = 0; row < board.length; row++) {
    let rowDiv = document.createElement("div");
    rowDiv.classList.add("row"); //<div class="row">
    for (let col = 0; col < board[0].length; col++) {
      let cell = document.createElement("div");
      cell.id = board[row][col].id;
      cell = !board[row][col].isOpen ?
        closeCell(row, col) :
        openCell(row, col);


      /*
      Should find a better solution
      */
      cell.addEventListener("click", function (event) {
        if (!board[row][col].isOpen) {
          console.log(cell);
          cell.classList.replace("close", "open");
          cell.innerHTML = board[row][col].neighbors;
        }
      });
      rowDiv.appendChild(cell);//
    }

    boardElement.appendChild(rowDiv); //
  }
}

initBoard(9, 9);
populateMines(10);
render();
