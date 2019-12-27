# minesweeper
Minesweeper

#### Description

### Not to do 


```javascript
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
  ```
