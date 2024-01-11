const apiKey = '0da0ef1e-d6fe-4f05-9f38-137f75daa1f8';

const mainUrl = 'http://exam-2023-1-api.std-900.ist.mospolytech.ru';

const routesUrl = '/api/routes';

function selectRoute(event) {
    alert('hello')
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
    tdBtn.textContent = record.tdBtn;
    tdBtn.addEventListener('click', selectRoute)
    tr.append(tdBtn);
    
    tbody.appendChild(tr);
} 

function splitMainObject(value) {
    console.log(value.match(/,/g)?.length)
    if (value.match(/,/g)?.length>=value.match(/\./g)?.length && value.match(/,/g)?.length>value.match(/-/g)?.length) {
        return value.split(',');
    }
    if (value.match(/\./g)?.length>value.match(/-/g)?.length && value.match(/\./g)?.length>=value.match(/,/g)?.length) {
        return value.split('.');
    }
        return value.split('-')
}

function getInfo(){
    const xhr = new XMLHttpRequest();
    const newUrl = new URL(routesUrl, mainUrl);
    newUrl.searchParams.set('api_key', apiKey);
    xhr.open("GET", newUrl);
    xhr.onload = function() {
        const records = JSON.parse(xhr.response);
        for (const record of records) {
            const select = document.querySelector('.form-select');
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
    getInfo();
})