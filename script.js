/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
'use strict';

const apiKey = '0da0ef1e-d6fe-4f05-9f38-137f75daa1f8';

const mainUrl = 'http://exam-2023-1-api.std-900.ist.mospolytech.ru';

const routesUrl = '/api/routes';

const tbodyGuides = document.querySelector('.tbodyGuides');

let arr = [];

// function itogShow(price, valueTimeOfTheExcursion, isThisDayOff, numberOfVisitors, priceTime) {
    
//     // let summaWithCheckbox1 = 0;
//     // const checkbox1 = document.getElementById('checkbox1');
//     // const checkbox2 = document.getElementById('checkbox2');

//     // const hidenPrice = document.getElementById('itogPrice');
//     // hidenPrice.style.display = "block";
    
// }

function modalWindow(pricePerHour, event) {
    const pricePH = pricePerHour.textContent;
    arr.push(pricePH);
    const price = Number(arr[0]);
    console.log(arr);
    const timeOfTheExcursion = document.getElementById('time-of-the-excursion');
    const valueTimeOfTheExcursion = timeOfTheExcursion.value;
    const peopleCount = Number(document.getElementById('people').value);
    const selectedDay = new Date(document.getElementById('davaToday').value);
    let isThisDayOff = 0;
    if (selectedDay === 0 || selectedDay === 6) {
        isThisDayOff = 1.5;
    } else {
        isThisDayOff = 1;
    };
    console.log(selectedDay);
    const currentTime = document.getElementById('timeStart');
    const valueTime = currentTime.value;
    let numberOfVisitors = 0;
    if (peopleCount >= 1 && peopleCount <= 5) {
        numberOfVisitors = 0;
    } else if (peopleCount > 5 && peopleCount <= 10) {
        numberOfVisitors = 1000;
    } else if (peopleCount > 10 && peopleCount <= 20) {
        numberOfVisitors = 1500;
    } else {
        numberOfVisitors = 0;
    };
    let priceTime = 0;
    if (valueTime >= 9 && valueTime <= 12) {
        priceTime = 400;
    } else if (valueTime >= 20 && valueTime <= 23) {
        priceTime = 1000;  
    } else {
        priceTime = 0;
    }
    let summa = price * valueTimeOfTheExcursion * isThisDayOff + numberOfVisitors + priceTime;
    console.log(summa);
    let summaWithCheckbox1 = 0
    if (checkbox1.checked) {
        summaWithCheckbox1 = summa * 1.3;     
        const itog = document.getElementById('itogPrice');
        itog.textContent = summaWithCheckbox1;   
    } else {
        const itog = document.getElementById('itogPrice');
        itog.textContent = summa;
    };
    let summaWithCheckbox2 = 0;
    if (checkbox2.checked) {
        let weekend = 0;
        if (selectedDay === 0 || selectedDay === 6) {
            weekend = 1.25;
        } else {
            weekend = 1.3;
        };
        summaWithCheckbox2 = summa * weekend;     
        const itog = document.getElementById('itogPrice');
        itog.textContent = summaWithCheckbox2;
    } else {
        const itog = document.getElementById('itogPrice');
        itog.textContent = summa;
    };
    let summaWithCheckbox1And2 = 0;
    if (checkbox1.checked && checkbox2.checked) {
        let weekend = 0;
        if (selectedDay === 0 || selectedDay === 6) {
            weekend = 1.25;
        } else {
            weekend = 1.3;
        };
        summaWithCheckbox1And2 = summa * weekend * 1.3;     
        const itog = document.getElementById('itogPrice');
        itog.textContent = summaWithCheckbox1And2;
    };
    // const itog = document.getElementById('itogPrice');
    // itog.textContent = summa;
}

document.querySelector('.btn-outline-secondary').addEventListener('click', modalWindow);

function clear() {
    arr.splice(1);
    document.getElementById('time-of-the-excursion').value = '1';
    document.getElementById('people').value = '1';
    document.getElementById('timeStart').value = "9";
    document.getElementById('davaToday').value = new Date().toISOString().split("T")[0];
    document.getElementById("checkbox1").checked = false;
    document.getElementById("checkbox2").checked = false;
    const itog = document.getElementById('itogPrice');
    itog.textContent = '';
}

document.querySelector('.btn-dark').addEventListener('click', clear);

function guidesName(name, event) {
    const guidesNameLine = document.getElementById('guidesName');
    guidesNameLine.textContent = name.textContent;
}

function addGuidesTableRow(record) {
    const tr = document.createElement('tr');
    tr.id = record.id;
    const name = document.createElement('td');
    name.textContent = record.name;
    tr.append(name);
    const language = document.createElement('td');
    language.textContent = record.language;
    tr.append(language);
    const workExperience = document.createElement('td');
    workExperience.textContent = record.workExperience;
    tr.append(workExperience);
    const pricePerHour = document.createElement('td');
    pricePerHour.textContent = record.pricePerHour;
    tr.append(pricePerHour);
    const tdBtnGuides = document.createElement('td');
    tdBtnGuides.textContent = "Выбрать";
    tdBtnGuides.style.color = "#bb0218";
    tdBtnGuides.style.fontWeight = "bold";
    tdBtnGuides.style.cursor = "pointer";
    tr.append(tdBtnGuides);
    tdBtnGuides.addEventListener('click', event => guidesName(name, event));
    tdBtnGuides.addEventListener('click', event => modalWindow(pricePerHour, event));
    tdBtnGuides.addEventListener('click', event => {
        let modal = document.querySelector('.modal');
        modal.style.display = 'block';
    });
    const select = document.querySelector('.guides-select');
    const option = document.createElement('option');
    option.textContent = record.language;
    select.append(option);

    tbodyGuides.appendChild(tr);
}

const davaToday = document.getElementById('davaToday');
const currentDate = new Date();
const minDate = currentDate.toISOString().split('T')[0];
davaToday.setAttribute('min', minDate);

function closeModalWindow(event) {
    let modal = document.querySelector('.modal');
    modal.style.display = 'none';
    arr = [];
}

let btnCloseModalWindow = document.querySelector('.btn-close');
btnCloseModalWindow.addEventListener('click', event => closeModalWindow(event));

function routeName(name, event) {
    const routeNameLine = document.getElementById('routeName');
    routeNameLine.textContent = name.textContent;
}

// function addTableRow(record) {
//     const tr = document.createElement('tr');
//     tr.id = record.id;
//     const name = document.createElement('td');
//     name.textContent = record.name;
//     tr.append(name);
//     const description = document.createElement('td');
//     description.textContent = record.description;
//     tr.append(description);
//     const mainObject = document.createElement('td');
//     mainObject.textContent = record.mainObject;
//     tr.append(mainObject);
//     const tdBtn = document.createElement('td');
//     tdBtn.textContent = "Выбрать";
//     tdBtn.style.color = "#bb0218";
//     tdBtn.style.fontWeight = "bold"
//     tdBtn.style.cursor = "pointer";
//     tdBtn.addEventListener('click', event => guidesId(tr, event));
//     tr.append(tdBtn);
    
//     tbody.appendChild(tr);
// } 

function guidesId(tr, event) {
    const forGued = tr.id;
    const guidesUrl = `/api/routes/${forGued}/guides`;
    const xhr = new XMLHttpRequest();
    const newUrl = new URL(guidesUrl, mainUrl);
    newUrl.searchParams.set('api_key', apiKey);
    xhr.open("GET", newUrl);
    xhr.onload = function() {
        const records = JSON.parse(xhr.response);
        for (const record of records) {
            addGuidesTableRow(record);
        }
    };
    xhr.send();
}

function renderOrders(orders) {
    const tbody = document.querySelector('.tbody');
    const guidesForm = document.querySelector('.guides');
    tbody.innerHTML = '';
    for (const record of orders) {
        const tr = document.createElement('tr');
        tr.id = record.id;
        const name = document.createElement('td');
        name.textContent = record.name;
        tr.append(name);
        const description = document.createElement('td');
        description.textContent = record.description;
        tr.append(description);
        const mainObject = document.createElement('td');
        mainObject.textContent = record.mainObject;
        tr.append(mainObject);
        const tdBtn = document.createElement('td');
        tdBtn.textContent = "Выбрать";
        tdBtn.style.color = "#bb0218";
        tdBtn.style.fontWeight = "bold";
        tdBtn.style.cursor = "pointer";
        tdBtn.addEventListener('click', event => guidesId(tr, event));
        tdBtn.addEventListener('click', event => routeName(name, event));
        tdBtn.addEventListener('click', event => {
            guidesForm.scrollIntoView({
                block: 'center',
                behavior: 'smooth',
            });
        });
        tr.append(tdBtn);
        tbody.appendChild(tr);
    }

}

function splitMainObject(value) {
    var commaCount = value.match(/,/g) ? value.match(/,/g).length : 0;
    var dotCount = value.match(/\./g) ? value.match(/\./g).length : 0;
    var dashCount = value.match(/-/g) ? value.match(/-/g).length : 0;
    
    if (commaCount >= dotCount && commaCount > dashCount) {
        return value.split(',');
    }
    if (dotCount > dashCount && dotCount >= commaCount) {
        return value.split('.');
    }
    
    return value.split('-');
}

let perPage = 5;
let currentPage = 1;
let totalPage = 0;

function renderPagination() {
    const blockPagination = document.querySelector('.pagination');
    const tableForm = document.querySelector('.routes');
    blockPagination.innerHTML = '';
    for (let i = 1; i <= totalPage; i++) {
        const btn = document.createElement('button');
        btn.setAttribute('class', 'btnPgn');
        btn.style.borderWidth = '3px';
        btn.style.borderColor = '#bb0218';
        btn.style.borderRadius = '7px';
        btn.style.margin = '3px';
        btn.textContent = i;
        btn.addEventListener('click', (event) => {
            const target = event.target;
            currentPage = target.textContent;
            getOrgers();
        });
        btn.addEventListener('click', event => {
            tableForm.scrollIntoView({
                block: 'start',
                behavior: 'smooth',
            });
        });
        blockPagination.append(btn);
    };
}

function getOrgers() {
    const url = new URL(routesUrl, mainUrl);
    url.searchParams.set('api_key', apiKey);
    let xhr = new XMLHttpRequest();
    xhr.open('get', url);
    xhr.send();
    xhr.onload = function() {
        const data = JSON.parse(xhr.response);
        totalPage = Math.ceil(data.length / perPage);
        const start = currentPage * perPage - perPage;
        const end = currentPage * perPage;
        renderOrders(data.slice(start, end));
        renderPagination();
        for (const record of data) {
            const select = document.querySelector('.routes-select');
            for (const elem of splitMainObject(record.mainObject)) {
                const option = document.createElement('option');
                option.textContent = elem;
                select.append(option);
            };
        };
    };
}

const selectNameObject = document.querySelector('#selectNameObject');
selectNameObject.addEventListener('input', (event) => {
    const value = event.target.value;
    const url = new URL(routesUrl, mainUrl);
    url.searchParams.set('api_key', apiKey);
    let xhr = new XMLHttpRequest();
    xhr.open('get', url);
    xhr.send();
    xhr.onload = function() {
        const data = JSON.parse(xhr.response);
        renderOrders(data.filter(item => item.mainObject.includes(value)));
        if (value == '') {
            getOrgers();
        };
    };
});

const inputNameObjects = document.querySelector('#inputNameObjects');
inputNameObjects.addEventListener('input', (event)=>{
    const value = event.target.value;
    const url = new URL(routesUrl, mainUrl);
    url.searchParams.set('api_key', apiKey);
    let xhr = new XMLHttpRequest();
    xhr.open('get', url);
    xhr.send();
    xhr.onload = function() {
        const data = JSON.parse(xhr.response);
        renderOrders(data.filter(item => item.name.includes(value)));
        if (value == '') {
            getOrgers();
        };
    };
});

function getData() {
    const xhr = new XMLHttpRequest();
    const url = new URL(routesUrl, mainUrl);
    url.searchParams.set('api_key', apiKey);
    xhr.open("GET", url);
    xhr.onload = function() {
        const records = JSON.parse(xhr.response);
        for (const record of records) {
            const select = document.querySelector('.routes-select');
            for (const elem of splitMainObject(record.mainObject)) {
                const option = document.createElement('option');
                option.textContent = elem;
                select.append(option);
            };
            addTableRow(record);
        }
    };
    xhr.send();
}

// function getData() {
//     const xhr = new XMLHttpRequest();
//     const url = new URL(routesUrl, mainUrl);
//     url.searchParams.set('api_key', apiKey);
//     xhr.open('get', url);
//     xhr.send();
//     xhr.onload = function() {
//         const results = JSON.parse(xhr.response);
//         const tbody = document.querySelector('.tbody');
//         for (const result of results) {
//             console.log(result);
//             tbody.innerHTML += `<tr id=${result.id}>
//             <td>${result.name}</td>
//             <td>${result.description}</td>
//             <td>${result.mainObject}</td>
//             <td><button>Выбрать</button></td>
//             </tr>`
//         }
//     }
// }

window.addEventListener('DOMContentLoaded', ()=>{
    getOrgers();
});