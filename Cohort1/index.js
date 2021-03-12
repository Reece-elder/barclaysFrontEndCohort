'use strict';

// Let is mutable, it lets you change the value after declaring
// let x = "test";

//const is not, once declared it can't be changed
// const y = 47;

//alert(y);

// console.log(`x is = ${x} and y = ${y}`);

// * Query Selectors

// ? 'Element'
// ? '.class'
// ? '#id'

let header = document.querySelector('h1');
// console.log(header);
// console.log(typeof header);
// console.log(header.textContent);
// console.log(typeof header.textContent);
// header.textContent = "this has been changed";

let subHeader = document.querySelector('.borderRed');
// console.log(subHeader.innerHTML);

let formDiv = document.querySelector('.formDiv');
// console.log(formDiv.innerHTML);
// console.log(formDiv.textContent);

let paragraph = document.querySelector('#paragraph');
// paragraph.innerHTML = "this has been modified";

let idForm = document.querySelector('#userIdForm');
let titleForm = document.querySelector('#titleForm');
let bodyForm = document.querySelector('#bodyForm');
console.log(idForm);
console.log(titleForm);
console.log(titleForm.value);
console.log(bodyForm);

// * Card Global variables

let cardTitle = document.querySelector('.card-title');
let cardBody = document.querySelector('.cardBodyText');
let cardId = document.querySelector('.cardIdText');

let cardDiv = document.querySelector('.cardDiv');
console.log(cardTitle);
console.log(cardBody);
console.log(cardId);
console.log(cardDiv);

// Regular function expression notation 
// let getData = function() {

// }

// let addFunc = (x,y) => x + y;

// console.log(addFunc(7,9));

// Arrow function Notation
let getData = () => {
    console.log("Function Clicked");
    let idValue = idForm.value;
    let titleValue = titleForm.value;
    let bodyValue = bodyForm.value;
    console.log(`The id is ${idValue} the title is ${titleValue} and the body is ${bodyValue}`);
    idForm.value = "";
    titleForm.value = "";
    bodyForm.value = "";
    // modifyCard(idValue, titleValue, bodyValue);
    // createCard(idValue, titleValue, bodyValue);

    let data = {
        userId: idValue,
        title: titleValue,
        body: bodyValue,
    };

    postFunc(data);
}

// let modifyCard = (id, title, body) => {
//     console.log("Modify card ran");
//     cardTitle.textContent = title;
//     cardBody.textContent = body;
//     cardId.textContent = `The userId is ${id}`;
// }

// let createCard = (id, title, body) => {
//     let newCard = document.createElement('div');
//     let newCardBody = document.createElement('div');
//     let newCardTitle = document.createElement('h5');
//     let newCardBodyText = document.createElement('p');
//     let newCardId = document.createElement('small');

//     newCard.className = "card my-2";
//     newCardBody.className = "card-body";
//     newCardTitle.className = "card-title";
//     newCardBodyText.className = "card-text";
//     newCardId.className = "text-muted";

//     newCardTitle.textContent = title;
//     newCardBodyText.textContent = body;
//     newCardId.textContent = `The userId is ${id}`;

//     cardDiv.appendChild(newCard);
//     newCard.appendChild(newCardBody);
//     newCardBody.appendChild(newCardTitle);
//     newCardBody.appendChild(newCardBodyText);
//     newCardBody.appendChild(newCardId);
// }

// * Fetch Requests
// ? Fetch is a function we use to pull data from a datasource
// ? Used with JSON, JavaScript Object Notation

// CRUD Project
// Create - POST
// Read - GET
// Update - PUT
// Delete - DELETE

// * Basic use case for a get request

// fetch(`https://jsonplaceholder.typicode.com/posts`) // 1
// .then((response) => {
//     if (response.status !== 200) {        // 2
//         console.error(`status: ${response.status}`);
//         return;
//     } response.json() // 3
//     .then((data) => console.info(data)); // 4 
// }).catch((error) => console.log(error)); // 5

// 1 - Start using the fetch method and give it a target
// 2 - Check if request is anything but status code of 200. If true log status code and continue to execute
// 3 - Take the response from the fetch and convert to JSON using .json ()
// 4 - Log the data to the console as console.info
// 5 - Fifth line will execute if there is an error

let readAll = () => {
    fetch(`https://jsonplaceholder.typicode.com/posts`) // 1
.then((response) => {
    if (response.status !== 200) {        // 2
        console.error(`status: ${response.status}`);
        return;
    } response.json() // 3
    .then((data) => {
        for (let i of data){
            // console.log(i);
            // console.log(i.title);
            createCard(i);
        }
    }); // 4 
}).catch((error) => console.log(error));
}

let readByID = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((response) => {
        if (response.status !== 200) {        // 2
            console.error(`status: ${response.status}`);
            return;
        } response.json() // 3
        .then((data) => createCard(data)); // 4 
    }).catch((error) => console.log(error));
}

let createCard = (object) => {
    console.log(object);
    let newCard = document.createElement('div');
    let newCardBody = document.createElement('div');
    let newCardTitle = document.createElement('h5');
    let newCardBodyText = document.createElement('p');
    let newCardId = document.createElement('small');

    newCard.className = "card my-2";
    newCardBody.className = "card-body";
    newCardTitle.className = "card-title";
    newCardBodyText.className = "card-text";
    newCardId.className = "text-muted";

    newCardTitle.textContent = object.title;
    newCardBodyText.textContent = object.body;
    newCardId.textContent = `The userId is ${object.userId}`;

    cardDiv.appendChild(newCard);
    newCard.appendChild(newCardBody);
    newCardBody.appendChild(newCardTitle);
    newCardBody.appendChild(newCardBodyText);
    newCardBody.appendChild(newCardId);
}

let submitBtn = document.querySelector('#submitFormBtn');
console.log(submitBtn);
submitBtn.addEventListener('click', getData);

let readByIdBtn = document.querySelector('#readByIdBtn');
readByIdBtn.addEventListener('click', function () {
    console.log("Read By ID invoked");
    let readByIdValue = idForm.value;
    readByID(readByIdValue);
});

let readAllBtn = document.querySelector('#readAllBtn');
readAllBtn.addEventListener('click', readAll);

// readByID(5);

// * Post Request

// Difference between GET and POST is that we're posting data, we need to have a body we send to the placeholder

let postFunc = (object) => {
    fetch(`https://jsonplaceholder.typicode.com/posts`, {
        method: `POST`,
        headers:{
            "Content-type": "application/json", // Header
          },
        body: JSON.stringify(object),
    }).then((response) => {
        if (response.status !== 201) {
            console.log((`status: ${response.status}`));
            return;
        } response.json()
        .then((data) => {
            console.log(`Request succesful with JSON response ${data}`);
            console.log(object);
        })
    }).catch((error) => console.log(error));
}

