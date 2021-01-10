'use strict'

const form = document.querySelector('.validate-form')
const fields = form.querySelectorAll('.inputField')
const firstName = document.querySelector('#first-name-input')
const lastName = document.querySelector('#last-name-input')
const mail = document.querySelector('#mail-input')
const nextBtn = form.querySelector('.next-button')
const inputs = document.querySelectorAll('input:not([type="submit"])');


for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('keyup', function() {
        checkInput(this);
    });
}

const removeValidation = function () {
    let errors = form.getElementsByClassName('error-text')
    let errorsText = form.getElementsByClassName('error-validate')
    // console.log('    console.log(error-text error-validate)', errors )
    for (let i = 0; i < errors.length; ++i) {
        errors[i].remove()
    }

    for (let i = 0; i < errorsText.length; ++i) {
        errorsText[i].classList.remove('error-validate')
    }
}


function checkInput(input){
    const nameReg= /(?=^.{3,20}$)^[A-Z][a-zA-Z0-9]*[._-]?[a-zA-Z0-9]+$/g;
    const email = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/;
    const id = input.id;
    let reg;

    switch (id) {
        case 'first-name-input': reg = nameReg;
        break;
        case 'last-name-input': reg = nameReg;
        break;
        case 'mail-input': reg = email;
        break;

    }

    function createAlertText() {
        let test = document.getElementsByClassName('error-text')
        if (test.length === 0){
            let error = document.createElement('div')
            error.className='error-text'
            error.innerHTML = 'Please give us some details'
            input.parentElement.classList.add('error-validate')
            input.parentElement.insertBefore(error, input)
        }
        return null
    }

    (reg.test(input.value) === false && input.value.length > 3 && input.value.length < 12) ? removeValidation() : createAlertText()
}

form.addEventListener('submit', function (event) {
    event.preventDefault()
    // removeValidation();

    for (let i = 0; i < fields.length; i++) {
        if (!fields[i].value) {
            let error = document.createElement('div')
            error.className='error-text'
            error.innerHTML = 'Please give us some details'
            form[i].parentElement.classList.add('error-validate')
            form[i].parentElement.insertBefore(error, fields[i])
        }
    }
    const user = {
        lastName: lastName.value,
        firstName: firstName.value,
        mail: mail.value
    };
    console.log('user info: ', user)
})

