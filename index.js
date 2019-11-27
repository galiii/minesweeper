





/*
an Object that return the proprties of:
    id -      String a key of the cell a combination of row and col
    row -     Int: which row in the Dashboard the Cell is in
    column -  Int which col in the Dashboard the Cell is in 
    isOpen -  Boolean value that tell me if the user open the cell (by Click event)
    isMine -  Boolean value that tell me if there is a Mine
    isFlag -  Boolean value that tell me if the User put a flag in this cell
    isClose - Booolean value that tell me if the Cell is closed 
*/
function Cell(row,column,open,close,mine,flag){
    return {
        id: row+""+column, //By using +""+ casting from Int to String
        row:row,
        column:column,
        close:close,
        open:open,
        mine:mine,
        flag:flag  
    }
};


class Dashboard{
    constructor(){
        this.countMines =0;
        this.arrayCells = [];
    }
    //Set Cells
    initCells(){
        for(let i=0;i<9;i++){
            for(let j=0;j<9;j++){
            //row,column,open,close,mine,flag
            this.arrayCells.push(Cell(i,j,false,true,false,false));
            }//end loop of columns
        }//end loop of rows
    }//

    printCells(){
        this.arrayCells.forEach(function(item){
            console.log(item);
        });
    }
}//End of Class


function addElements(){
const divCon = document.getElementById('game');
for(let i=0;i<81;i++){
var itemsDiv = document.createElement("div"); // create a new div element
itemsDiv.classList.add("close","number");
//console.log(itemsDiv);


//let newContent = document.createTextNode(1); // and give it some content 
//itemsDiv.appendChild(newContent); //add the text node to the newly created div 
divCon.appendChild(itemsDiv);
}
const board = new Dashboard();
board.initCells();
board.printCells();
}

addElements();
