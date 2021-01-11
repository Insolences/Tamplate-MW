'use strict'

const form1 = document.querySelector('.validate-form-page1')
const form2= document.querySelector('.validate-form-page2')
console.log(form2)
const fields1 = form1.querySelectorAll('.inputField')
const fields2 = form2.querySelectorAll('.inputField')
const firstName = document.querySelector('#first-name-input')
const lastName = document.querySelector('#last-name-input')
const mail = document.querySelector('#mail-input')
const company = document.querySelector('#company-input')
const phone = document.querySelector('#phone-input')
const password = document.querySelector('#password-input')

const inputs = document.querySelectorAll('input:not([type="submit"])');

for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('keyup', function() {
        checkInput(inputs[i].name, inputs[i].value) ? removeError(inputs[i]) : removeCheckImg(inputs[i]);
    });
}

function checkInput(name, value){
    const nameReg= /\b([a-z]+[ ]*)+/g;
    const email = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/;
    let reg;

    switch (name) {
        case 'FirstName':
        case 'LastName':
            reg = nameReg;
            break;
        case 'Email': reg = email;
            break;
    }

    return reg.test(value) && value.length > 3;
}

const removeError = function (input) {
    let error = input.parentNode.parentNode.querySelector('.error-text')
    console.log(error)
    let checkValidate = input.parentNode.parentNode.querySelector('.focus-input100')
    input.parentElement.classList.remove('error-validate')
    error.classList.remove('show')
    checkValidate.classList.add('true-validate')
}

const removeCheckImg = function (input) {
    input.parentNode.parentNode.querySelector('.focus-input100').classList.remove('true-validate')
}



form1.addEventListener('submit', function (event) {
    event.preventDefault()
    for (let i = 0; i < fields1.length; i++) {
        if (!fields1[i].value) {
            let error = document.querySelectorAll('.error-text')
            error[i].classList.add('show')
            form1[i].parentElement.classList.add('error-validate')
        }
    }

    const user = {
        lastName: lastName.value,
        firstName: firstName.value,
        mail: mail.value
    };

    if(checkInput('FirstName', firstName.value) && checkInput('LastName', lastName.value) && checkInput('Email', mail.value)) {
        window.location.href = '/Tamplate-MW/pages/reg_page_2.html';
    }
    console.log('user info: ', user)
})

form2.addEventListener('submit', function (event) {
    event.preventDefault()
    for (let i = 0; i < fields2.length; i++) {
        if (!fields2[i].value) {
            let error = document.querySelectorAll('.error-text')
            error[i].classList.add('show')
            form2[i].parentElement.classList.add('error-validate')
        }
    }

    const user = {
        company: company.value,
        phone: phone.value,
        password: password.value
    };

    if(checkInput('Company', company.value) && checkInput('Phone', phone.value) && checkInput('Password', password.value)) {
        window.location.href = '/Tamplate-MW/pages/Thank_you_page.html';
    }
    console.log('user info: ', user)
})

