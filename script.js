'use strict'

const apiKey = '0da0ef1e-d6fe-4f05-9f38-137f75daa1f8';

const mainUrl = 'http://exam-2023-1-api.std-900.ist.mospolytech.ru';

const routesUrl = '/api/routes';

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

const tbodyGuides = document.querySelector('.tbodyGuides');

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
    tdBtnGuides.addEventListener('click', event => modalWindow(event));

    const select = document.querySelector('.guides-select');
    const option = document.createElement('option');
    option.textContent = record.language;
    select.append(option);

    tbodyGuides.appendChild(tr);
}

function modalWindow(event) {
    let modal = document.querySelector('.modal');
    modal.style.display = 'block';


}

let btnCloseModalWindow = document.querySelector('.btn-close')
btnCloseModalWindow.addEventListener('click', event => closeModalWindow(event));

function closeModalWindow(event) {
    let modal = document.querySelector('.modal');
    modal.style.display = 'none';
}

// function selectRoute(event) {
//     alert('hncbds');
// }

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

let perPage = 5;
let currentPage = 1;
let totalPage = 0;

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
        renderOrders(data.filter(item => item.name.includes(value)))
        if (value == '') {
            getOrgers();
        };
    };
});

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
        renderOrders(data.filter(item => item.mainObject.includes(value)))
        if (value == '') {
            getOrgers();
        };
    };
});

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
        tdBtn.style.fontWeight = "bold"
        tdBtn.style.cursor = "pointer";
        tdBtn.addEventListener('click', event => guidesId(tr, event));
        tdBtn.addEventListener('click', event => {
            guidesForm.scrollIntoView({
                block: 'nearest',
                behavior: 'smooth',
            });
        });
        tr.append(tdBtn);
        tbody.appendChild(tr);
    }

}

function renderPagination() {
    const blockPagination = document.querySelector('.pagination');
    const tableForm = document.querySelector('.routes');
    blockPagination.innerHTML = '';
    for (let i = 1; i <= totalPage; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        if (currentPage === i) {
            btn.style.backgroundColor = '#bb0218';
            btn.style.color = 'white';
        } else {
            btn.style.backgroundColor = 'none';
        };
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

function getData(){
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
    }
    xhr.send();
}

function splitMainObject(value) {
    if (value.match(/,/g)?.length>=value.match(/\./g)?.length && value.match(/,/g)?.length>value.match(/-/g)?.length) {
        return value.split(',');
    }
    if (value.match(/\./g)?.length>value.match(/-/g)?.length && value.match(/\./g)?.length>=value.match(/,/g)?.length) {
        return value.split('.');
    }
        return value.split('-');
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
})
