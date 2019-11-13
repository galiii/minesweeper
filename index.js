
//let itemsDiv = [];

function addElements(){
const divCon = document.querySelector('.dashbourd-game');
for(let i=0;i<81;i++){
var itemsDiv = document.createElement("div"); // create a new div element
//itemsDiv.setAttribute("class", "box-unswitch");
itemsDiv.setAttribute("class", "cell","number");

//itemsDiv.setAttribute("class", "number");
//itemsDiv.setAttribute("class", "one");
console.log(typeof itemsDiv); 
console.log(itemsDiv);
let newContent = document.createTextNode(1); // and give it some content 
itemsDiv.appendChild(newContent); //add the text node to the newly created div 
divCon.appendChild(itemsDiv);
}


}

addElements();