'use strict';

// let x = "this is a string";
// const y = 78;

// console.log(x);
// console.log(typeof x);

 // x = "this is a new String"

// x = 7;

 // y = 123;

// console.log(x);
// console.log(typeof x);

// console.log(y);
// console.log(typeof y);

// let testFunction = () => {
//     let x = "this is local";
//     let localVar = "you cant access me!";
//     console.log("test Function has been run");
//     console.log(x);
//     return(localVar);
// }

// testFunction();
// console.log(testFunction());

// * Document Variables
// Grab more DOM Elements and create them as global variables
// ? Document Object Model 

const header = document.querySelector('h1');
// console.log(header);
// console.log(typeof header);
header.textContent = "New Title Added";

const formDiv = document.querySelector('.formDiv');
const cardDiv = document.querySelector('.cardDiv');

const readAllDiv = document.querySelector('#readAllDiv');
const readOneDiv = document.querySelector('#readOneDiv');

console.log(readAllDiv);
console.log(readOneDiv);

const userIdForm = document.querySelector('#userIdForm');
const titleForm = document.querySelector('#titleForm');
const bodyForm = document.querySelector('#bodyForm');

const submitBtn = document.querySelector('#submitBtn');
const readAllBtn = document.querySelector('#readAllBtn');
const readByIdBtn = document.querySelector('#readByIdBtn');
const addBtn = document.querySelector('#addBtn');
const consoleBtn = document.querySelector('#consoleBtn');

const cardTitleText = document.querySelector('.cardTitleText');
const cardBodyText = document.querySelector('.cardBodyText');
const cardIdText = document.querySelector('.cardIdText');

let paraCounter = 0; 

// * Fetch Requests / Functions
// Add more functions, fetch requests and put fetch requests inside of functions

let getDataForm = () => {
    let idValue = userIdForm.value;
    let titleValue = titleForm.value;
    let bodyValue = bodyForm.value;
    clearForm();
    // console.log(`The ID is ${idValue}, the title is ${titleValue} and the body is ${bodyValue}`);
    // modifyCard(titleValue, bodyValue, idValue);
    // createCard(titleValue, bodyValue, idValue);
    createData(idValue, titleValue, bodyValue);
}

let modifyCard = (title, body, id) => {
    console.log(title  + body + id);
    cardTitleText.textContent = title;
    cardBodyText.textContent = body;
    cardIdText.textContent = `The user ID is ${id}`;
}

let addElement = () => {
    //console.log("Button Clicked");
    let newPara = document.createElement('p');
    newPara.innerHTML = `This is a new paragraph of number ${paraCounter}`;
    paraCounter ++;
    cardDiv.appendChild(newPara);
}

let createCard = (data, target) => {
    let newCard = document.createElement('div');
    let newCardBody = document.createElement('div');
    let newCardTitle = document.createElement('h5');
    let newCardBodyText = document.createElement('p');
    let newCardId = document.createElement('p');

    newCard.className = "card my-2";
    newCardBody.className = "card-body";
    newCardTitle.className = "card-title";
    newCardBodyText.className = "card-text";
    newCardId.className = "card-text";

    newCardTitle.textContent = data.title;
    newCardBodyText.textContent = data.body;
    newCardId.innerHTML = `<small class="text-muted cardIdText">The User ID is ${data.userId}</small>`;

    target.appendChild(newCard);
    newCard.appendChild(newCardBody);
    newCardBody.appendChild(newCardTitle);
    newCardBody.appendChild(newCardBodyText);
    newCardBody.appendChild(newCardId);
}

// fetch(`https://jsonplaceholder.typicode.com/posts`)
// .then((response) => {
//     if (response.status !== 200) {        // 2
//         console.error(`status: ${response.status}`);
//         return;
//     } response.json() // 3
//     .then((data) => {
//         console.log(data);
//     }); // 4 
// }).catch((error) => console.log(error));

let readAllData = () => {
    fetch(`https://jsonplaceholder.typicode.com/posts`)
    .then((response) => {
    if (response.status !== 200) {
        console.error(`status: ${response.status}`);
        return;
    } response.json()
    .then((data) => {
        for (let i of data){
            // console.log(i);
            // console.log(i.title);
            createCard(i, readAllDiv);
        }
    });
    }).catch((error) => console.log(error));
}

let readById = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((response) => {
        if (response.status !== 200) {
            console.error(`status: ${response.status}`);
            return;
        } response.json()
        .then((data) => {
            createCard(data, readOneDiv);
        });
        }).catch((error) => console.log(error));
}

let createData = (id, title, body) => {
    let newObject = {
        userId: id,
        title: title,
        body: body,
    }
    console.log(newObject);
    postData(newObject);
}

let postData = (data) => {
    fetch(`https://jsonplaceholder.typicode.com/posts`, {
        method: `POST`, 
        headers: {
            "Content-type": "application/json", 
        }, 
        body: JSON.stringify(data)
    })
    .then((response) => {
        if (response.status !== 201) {
            console.error(`status: ${response.status}`);
            return;
        } console.log(`Post Succesful with data ${data.title}`);
    }).catch((error) => console.log(error));
}

let clearForm = () => {
    userIdForm.value = "";
    titleForm.value = "";
    bodyForm.value = "";
}

// * Add Event Listeners
// Event Listeners for buttons so they can do the functionality they need to do

submitBtn.addEventListener('click', getDataForm);
readAllBtn.addEventListener('click', readAllData);
readByIdBtn.addEventListener('click', function() {
    let idValue = userIdForm.value;
    clearForm();
    readById(idValue);
});
