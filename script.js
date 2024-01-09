const apiKey = '0da0ef1e-d6fe-4f05-9f38-137f75daa1f8';

const mainUrl = 'http://exam-2023-1-api.std-900.ist.mospolytech.ru';

const routesUrl = '/api/routes';

function getData() {
    const xhr = new XMLHttpRequest();
    const url = new URL(routesUrl, mainUrl);
    url.searchParams('api_key', apiKey);
    xhr.open('get', url);
    xhr.send();
    xhr.onload = function() {
        console.log(xhr.response);
    }
}

window.addEventListener('DOMContentLoaded', ()=>{
    getData();
})