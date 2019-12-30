# minesweeper
Minesweeper

#### Description

### Not to do 


```javascript
 board[
    [cell1,cell2,cell3,cell4,cell5,cell6,cell7,cell8,cell9],
    .
    .
    .
    [cell1,cell2,cell3,cell4,cell5,cell6,cell7,cell8,cell9]
    ]

if (y - 1 >= 0) {
    if (x - 1 >= 0) {
      board[y - 1][x - 1].neighbors++;
    }
    if (x + 1 < board[0].length) {
      board[y - 1][x + 1].neighbors++;
    }
    board[y - 1][x].neighbors++;
  }


  if (y + 1 < board.length) {
    if (x - 1 >= 0) {
      board[y + 1][x - 1].neighbors++;
    }
    if (x + 1 < board[0].length) {
      board[y + 1][x + 1].neighbors++;
    }
    board[y + 1][x].neighbors++;
  }


  if (x - 1 >= 0) {
    board[y][x - 1].neighbors++;
  }
  if (x + 1 < board[0].length) {
    board[y][x + 1].neighbors++;
  }



  /**
 * The purpose of this function is to populate the Mines
 * @param {number} numMines - witch will be on the board
 */
function populateMines(numMines) {
    .
    .
  while (numMines > 0) {
    let y = Math.floor(Math.random() * board.length); //Random num of rows
    let x = Math.floor(Math.random() * board[0].length); //Random num of columns
    
    if (!board[y][x].isMine) {
      board[y][x].isMine = true; //set it to be true
      calculateNeighbors(y, x);
      numMines--; //decrease the number of mines we have left to assigned
    }
  }
}



function calculateNeighbors(row, col){
 board[row - 1][col - 1].neighbors++;
 board[row - 1][col].neighbors++;
 board[row - 1][col + 1].neighbors++;
 board[row][col - 1].neighbors++;
 board[row][col + 1].neighbors++;
 board[row + 1][col - 1].neighbors++;
 board[row + 1][col].neighbors++;
 board[row + 1][col +  1].neighbors++;
}




  ```
