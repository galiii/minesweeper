# Calculate Neighbors

The first step is to calculate and allocate mines on the board
 The planing of the mines is exhausted

 ```javascript
function populateMines(numMines) {
  clearBoard();
  //The run time of this function is O(numMines)
  while (numMines > 0) {
    let row = Math.floor(Math.random() * board.length); 
    let col = Math.floor(Math.random() * board[0].length); 

    if (!board[row][col].isMine) {
      board[row][col].isMine = true; //set it to be true
      numMines--;
     
      calculateNeighbors(row, col);
    }
  }
}
 ```
 When you give this function as a number of mines parameter
  ```javascript
numMines
 ```

 Run until you finish assigning the required number of mines
 ```javascript
  while (numMines > 0)
  ```

  If it is not mined by the object that I will immediately specify 
  if the template object is not mined then you will assign it
   ```javascript
  if (!board[row][col].isMine) {
      board[row][col].isMine = true; 
  ```
  
We now have a neighbor calculation that will help us 
later when the user clicks the cell
Now there can be some clicking : 
situations when it is mined or when a number then needs to do a neighbors calculation

So there may be some options for neighbors 8 5 or 3




3 Neighbors (`0-1` `-1-1` `-10`)

| row\col   | 0      | +1     |
| ---------:| :----- |:-----: |
| **0**         | Mine00 | 0+1   
| **+1**        |   +1-1 | +1+1   |  


5 Neighbors

| row\col   | -1     | 0      | +1     |
| ---------:| :----- |:-----: |:-----: |
| **0**         |    0-1 | Mine00 | 0-1    |
| **+1**        |   +1-1 | +10    | +1+1   | 


8 Neighbors

| row\col   | -1     | 0      | +1     |
| ---------:| :----- |:-----: |:-----: |
| **-1**    |  -1-1  | -10    | -1+1   |
| **0**     |  0-1   | Mine00 | 0+1    | 
| **+1**    |  +1-1  | +10    | +1+1   | 


```javascript
function calculateNeighbors(row, col) {
  for (let i = -1; i <= 1; i++) {
    if (row + i >= 0 && row + i < board.length) {
      for (let j = -1; j <= 1; j++) {
        if (col + j >= 0 && col + j < board[0].length) {
          if (!board[row + i][col + j].isMine) {
            board[row + i][col + j].neighbors++;
          } 
        }
      }
    }
  }
}
```