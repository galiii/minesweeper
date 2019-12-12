const smilyBtn = document.getElementById("smileBtn");
let board; //

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
        y: i,
        x: j,
        id: i + "" + j,
        isOpen: false, //Boolean value that tell me if the user open the cell (by Click event)
        isMine: false, //Boolean value that tell me if there is a Mine
        isFlag: false //Boolean value that tell me if the User put a flag in this cell
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
  for (let i = 0; i < board.length; i++) {
    //every column (width)
    for (let j = 0; j < board[i].length; j++) {
      board[i][j].isMine = false;
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
      board[y][x].isOpen = true;
      numMines--; //decrease the number of mines we have left to assigned
    }
  }
}

/**
 *
 * @param {number} x
 * @param {number} y
 */
function cellClicked(x, y) {
  console.log(`hey there line 83 ${x} ${y}`);
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
function openCell(i, j) {
  let cell = document.createElement("div");
  cell.classList.add("open");
  board[i][j].isMine ?
    cell.classList.add("mine") :
    cell.classList.add("open");
  cell.id = board[i][j].id;
  return cell;
}

/*
Help function for styling 
if Cell is Close we have 2 Question
if it's Flag we have class of mine
and if it's not only opens
*/
function closeCell(i, j) {
  let cell = document.createElement("div");
  cell.classList.add("close");
  board[i][j].Flag ?
    cell.classList.add("flag") :
    cell.classList.add("close");
  cell.id = board[i][j].id;
  return cell;
}

/**
 * 
 */
function render() {
  const boardElement = document.getElementById("game"); //
  boardElement.innerHTML = "";
  for (let i = 0; i < board.length; i++) {
    let row = document.createElement("div");
    row.classList.add("row"); //<div class="row">
    for (let j = 0; j < board[0].length; j++) {
      let cell = document.createElement("div");
      cell.id = board[i][j].id;
      cell = !board[i][j].isOpen ?
        closeCell(i, j) :
        openCell(i, j);
      /*
      Should find a better solution
      */
      cell.addEventListener("click", function (event) {
        //console.log("the event", event);
        //console.log("this object", this);

        if (!board[i][j].isOpen) {
          cell.classList.replace("close", "open");
        }
      });
      row.appendChild(cell);//
    }

    boardElement.appendChild(row); //
  }
}

initBoard(9, 9);
populateMines(10);
render();
