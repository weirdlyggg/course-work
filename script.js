const apiKey = '0da0ef1e-d6fe-4f05-9f38-137f75daa1f8';

const mainUrl = 'http://exam-2023-1-api.std-900.ist.mospolytech.ru';

const routesUrl = '/api/routes';

function selectRoute(event) {
    //доделать обработчик
}

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