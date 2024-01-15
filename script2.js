/* eslint-disable max-len */
'use strict';

document.addEventListener('DOMContentLoaded', function() {
    let modal = document.querySelector('.modal');
    let btnClose = document.querySelector('.btn-outline-danger');
    modal.style.display = 'block';
    btnClose.onclick = function() {
        modal.style.display = 'none';
    };
    let btnCloseTop = document.querySelector('.btn-close');
    modal.style.display = 'block';
    btnCloseTop.onclick = function() {
        modal.style.display = 'none';
    };
});