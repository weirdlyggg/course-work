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
    tdBtnGuides.addEventListener('click', event => guidesName(name, event));
    tr.append(tdBtnGuides);
    const select = document.querySelector('.guides-select')
    const option = document.createElement('option');
    option.textContent = record.language;
    select.append(option);
    tbodyGuides.appendChild(tr);
}

function selectRoute(event) {
    alert('hncbds');
}



const tbody = document.querySelector('.tbody');

function addTableRow(record) {
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
    tdBtn.addEventListener('click', event => guidesId(tr, event));
    tr.append(tdBtn);
    
    tbody.appendChild(tr);
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
        return value.split('-')
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
    getData();
})