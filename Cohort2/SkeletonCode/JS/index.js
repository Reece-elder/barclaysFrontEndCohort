'use strict';

// * Document Variables
// Grab more DOM Elements and create them as global variables
// ! Document Object Model

let header = document.querySelector('h1');
header.textContent = "New Title Added";

let formDiv = document.querySelector('.formDiv');
// let cardDiv = document.querySelector('.cardDiv');
let allDataDiv = document.querySelector('#allDataDiv')
let singleDataDiv = document.querySelector('#singleDataDiv')

let userIdForm = document.querySelector('#userIdForm');
let titleForm = document.querySelector('#titleForm');
let bodyForm = document.querySelector('#bodyForm');
// console.log(titleForm);
// console.log(bodyForm);

let getAllDataBtn = document.querySelector('#getAllDataBtn');
let getDataByIdBtn = document.querySelector('#getDataIdBtn');
let postDataBtn = document.querySelector('#postDataBtn');
let deleteBtn = document.querySelector('#deleteBtn');

// let addBtn = document.querySelector('#newParaBtn');
// let getDataBtn = document.querySelector('#postToConsoleBtn');

let cardTitle = document.querySelector('#cardTitle');
let cardBody = document.querySelector('#cardBody');
let cardId = document.querySelector('#cardId');

let paraCounter = 0;
// console.log(header);
// console.log(typeof header); 
// let stringExample = "testString";

// console.log(typeof stringExample);
// console.log(typeof paraCounter);
// console.log(paraCounter);
// console.log(stringExample);

// * Fetch Requests / Functions
// Add more functions, fetch requests and put fetch requests inside of functions

// ? Arrow Function
let getDataForm = () => {
    let idValue = userIdForm.value;
    let titleValue = titleForm.value;
    let bodyValue = bodyForm.value;
    clearData();
    console.log(`The Id Value is ${idValue}, the title value is ${titleValue} and the body value is ${bodyValue}`);      
    updateCardData(idValue, titleValue, bodyValue);
    createCard(idValue, titleValue, bodyValue);
}

let updateCardData = (id, title, body) => {
    cardId.textContent = id;
    cardTitle.textContent = title;
    cardBody.textContent = body;
}

let clearData = () => {
    userIdForm.value = "";
    titleForm.value = "";
    bodyForm.value = "";
}

// // * Traditional Function 
// function getData(paramater) {

// }

let addElement = () => {
    let newPara = document.createElement('p');
    newPara.textContent = `This is a new paragraph of number ${paraCounter}`;
    paraCounter ++;
    cardDiv.appendChild(newPara);
}

let createCard = (id, title, body) => {
    let newCard = document.createElement('div');
    let newCardBody = document.createElement('div');
    let newCardTitle = document.createElement('h5');
    let newCardTextBody = document.createElement('p');
    let newCardIdPara = document.createElement('p');
    let newCardIdSmall = document.createElement('small');

    newCard.className = "card my-2";
    newCardBody.className = "card-body";
    newCardTitle.className = "card-title";
    newCardTextBody.className = "card-text";
    newCardIdPara.className = "card-text";
    newCardIdSmall.className = "text-muted";

    newCardTitle.textContent = title;
    newCardBody.textContent = body;
    newCardIdSmall.textContent = `The User ID is ${id}`;

    allDataDiv.appendChild(newCard);
    newCard.appendChild(newCardBody);
    newCardBody.appendChild(newCardTitle);
    newCardBody.appendChild(newCardTextBody);
    newCardBody.appendChild(newCardIdPara);
    newCardIdPara.appendChild(newCardIdSmall);
}

let createCardFetch = (object, target) => {
    let newCard = document.createElement('div');
    let newCardBody = document.createElement('div');
    let newCardTitle = document.createElement('h5');
    let newCardTextBody = document.createElement('p');
    let newCardIdPara = document.createElement('p');
    let newCardIdSmall = document.createElement('small');

    newCard.className = "card my-2";
    newCardBody.className = "card-body";
    newCardTitle.className = "card-title";
    newCardTextBody.className = "card-text";
    newCardIdPara.className = "card-text";
    newCardIdSmall.className = "text-muted";

    newCardTitle.textContent = object.title;
    newCardTextBody.textContent = object.body;
    newCardIdSmall.textContent = `The User ID is ${object.userId}`;

    target.appendChild(newCard);
    newCard.appendChild(newCardBody);
    newCardBody.appendChild(newCardTitle);
    newCardBody.appendChild(newCardTextBody);
    newCardBody.appendChild(newCardIdPara);
    newCardIdPara.appendChild(newCardIdSmall);
}

// fetch(`https://jsonplaceholder.typicode.com/posts`)
// .then((response) => {
//     if (response.status !== 200) {
//         console.error(`Status: ${response.status}`);
//         return;
//     } response.json().then((data) => {
//         console.log(data);
//     });
// }).catch((error) => {
//     console.log(error);
// });

let readAllData = () => {
    fetch(`https://jsonplaceholder.typicode.com/posts`)
    .then((response) => {
    if (response.status !== 200) {
        console.error(`Status: ${response.status}`);
        return;
    } response.json().then((data) => {
        console.log(data);
        for (let i of data) {
            // console.log(i);
            createCardFetch(i, allDataDiv)
        }
    });
}).catch((error) => {
    console.log(error);
});
}

let readByID = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((response) => {
    if (response.status !== 200) {
        console.error(`Status: ${response.status}`);
        return;
    } response.json().then((data) => {
        console.log(data);
        createCardFetch(data,singleDataDiv)
    });
}).catch((error) => {
    console.log(error);
});
}

let deleteByID = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: `DELETE`
    })
    .then((response) => {
    if (response.status !== 200) {
        console.error(`Status: ${response.status}`);
        return;
    } console.log("Delete Succesful");
}).catch((error) => {
    console.log(error);
});
}

let myObject = {
    userId: 100,
    title: "This is a test",
    body: "This is a body test"
}

let createData = () => {
    myObject = {
        userId: userIdForm.value,
        title: titleForm.value,
        body: bodyForm.valuem,
    }
    clearData();
    console.log(myObject);
    postData(myObject)
}

let postData = (object) => {
    console.log(object);
    fetch(`https://jsonplaceholder.typicode.com/posts`, {
        method: `POST`,
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(object),
    })
    .then((response) => {
    if (response.status !== 201) {
        console.error(`Status: ${response.status}`);
        return;
    } console.log(`Post Succesful with data ${object}`);
}).catch((error) => {
    console.log(error);
});
}


// * Add Event Listeners
// Event Listeners for buttons so they can do the functionality they need to do

// addBtn.addEventListener('click', addElement);

// getDataBtn.addEventListener('click', getDataForm);

getAllDataBtn.addEventListener('click', readAllData);

getDataByIdBtn.addEventListener('click', function () {
    let idValue = userIdForm.value;
    clearData();
    readByID(idValue);
});

deleteBtn.addEventListener('click', function() {
    let idValue = userIdForm.value;
    clearData();
    deleteByID(idValue);
})

// postDataBtn.addEventListener('click', function () {
//     postData(myObject);
// })

postDataBtn.addEventListener('click', createData);
