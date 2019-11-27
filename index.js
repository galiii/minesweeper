

function Cell(){


};


class Dashboard{

}



function addElements(){
const divCon = document.getElementById('game');
for(let i=0;i<81;i++){
var itemsDiv = document.createElement("div"); // create a new div element
itemsDiv.classList.add("open","number");
console.log(itemsDiv);
let newContent = document.createTextNode(1); // and give it some content 
itemsDiv.appendChild(newContent); //add the text node to the newly created div 
divCon.appendChild(itemsDiv);
}
}


addElements();