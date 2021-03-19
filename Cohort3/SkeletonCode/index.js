'use strict'

// * Document Variables
// Grab more DOM Elements and create them as global variables

let header = document.querySelector('h1');
header.textContent = "New Title Added";

let formDiv = document.querySelector('.formDiv');
let cardDiv = document.querySelector('.cardDiv');

let userIdForm = document.querySelector('#userIdForm');

let submitBtn = document.querySelector('#submitBtn');
let addBtn = document.querySelector('#addBtn');

let paraCounter = 0; 

// * Fetch Requests / Functions
// Add more functions, fetch requests and put fetch requests inside of functions

let getDataForm = () => {
    let idValue = userIdForm.value;
    console.log(idValue);
}

let addElement = () => {
    //console.log("Button Clicked");
    let newPara = document.createElement('p');
    newPara.innerHTML = `This is a new paragraph of number ${paraCounter}`;
    paraCounter ++;
    cardDiv.appendChild(newPara);
}

fetch(`https://jsonplaceholder.typicode.com/posts`)
.then((response) => {
    if (response.status !== 200) {        // 2
        console.error(`status: ${response.status}`);
        return;
    } response.json() // 3
    .then((data) => {
        console.log(data);
    }); // 4 
}).catch((error) => console.log(error));

// * Add Event Listeners
// Event Listeners for buttons so they can do the functionality they need to do

submitBtn.addEventListener('click', getDataForm);
addBtn.addEventListener('click', addElement);
