let board; //

/*
Two dimension - 
    for example if we have bord with: 3X3 :
    board = [[{1},{2},{3}],
             [{4},{5},{6}],
             [{7},{8},{9}]]
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
        isFlag: false //Boolean value that tell me if the User put a flag in this cell
      };
      row.push(cell); //have the cell object (item) to the row in other words row[i][j] = cell
    }
    board.push(row); //row[i] = [{cell},{cell},{cell}]
  }
}

/**
 * The purpose of this function is : to insert isMine = false
 * for every cell in the board
 **/
function clearBoard() {
  for (let i = 0; i < board.length; i++) {
    //every row (height)
    for (let j = 0; j < board[i].length; j++) {
      //every column (width)
      board[i][j].isMine = false;
    }
  }
}

/*
The purpose of this function is to populate the Mines
*/
function populateMines(numMines) {
  clearBoard(); //Reset - isMine  the property of cell for a new game
  //The run time of this function is O(numMines)
  while (numMines > 0) {
    //while there are still mines that we didn't populate
    let y = Math.floor(Math.random() * board.length); //Random num of rows
    let x = Math.floor(Math.random() * board[0].length); //Random num of columns
    if (!board[x][y].isMine) {
      //If in the cell of board[x][y].isMine === false
      board[x][y].isMine = true; //set it to be true
      board[x][y].isOpen = true;
      numMines--; //decrease the number of mines we have left to assigned
    }
  }
}

function cellClicked(x, y) {}

/*
Help function for styling 
if Cell is open we have 2 Qustion
if it's Mine we have class of mine
and if it's not only open
*/
function openCell(i, j) {
  let cell = document.createElement("div");
  cell.classList.add("open");
  board[i][j].isMine ? cell.classList.add("mine") : cell.classList.add("open");
  return cell;
}

/*
Help function for styling 
if Cell is Close we have 2 Qustion
if it's Flag we have class of mine
and if it's not only open
*/
function closeCell(i, j) {
  let cell = document.createElement("div");
  cell.classList.add("close");
  board[i][j].Flag ? cell.classList.add("flag") : cell.classList.add("close");
  return cell;
}

function render() {
  const boardElement = document.getElementById("game"); //
  boardElement.innerHTML = "";

  for (let i = 0; i < board.length; i++) {
    let row = document.createElement("div");
    for (let j = 0; j < board[0].length; j++) {
      //let cell = document.createElement("div");
      let cell = board[i][j].isOpen ? openCell(i, j) : closeCell(i, j);

      row.appendChild(cell); //
    }
    boardElement.appendChild(row); //
  }
}

initBoard(9, 9);
populateMines(10);
render();
