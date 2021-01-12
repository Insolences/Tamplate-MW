form('.validate-form-page1', '/Tamplate-MW/pages/registration_page_2.html');
form('.validate-form-page2', '/Tamplate-MW/pages/Thank_you_page.html');

function checkInput(input){
    const nameReg= /\b([a-z]+[ ]*)+/g;
    const onlyNumber = /^[0-9()\-+ ]+$/;
    const email = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/;
    let check = false;
    let reg;
    let {type, value} = input;

    switch (type) {
        case 'text':
        case 'password':
            reg = nameReg;
            break;
        case 'email': reg = email;
            break;
        case 'tel': reg = onlyNumber;
            break;
        case 'checkbox': check = testCheck(input);
    }
console.log(input.checked)
    return  value.length > 3  && (check || reg.test(value));
}

const removeError = function (input) {
    let error = input.closest('.input-container').querySelector('.error-text')
    let checkValidate = input.closest('.validate-input').querySelector('.focus-input100')
    input.parentElement.classList.remove('error-validate')
    error.classList.remove('show')
    checkValidate.classList.add('true-validate')
}

function removeCheckImg (input) {
    input.closest('.validate-input').querySelector('.focus-input100').classList.remove('true-validate')
}

function validateInput (fields) {
    for (let i = 0; i < fields.length; i++) {
        fields[i].addEventListener('keyup', function() {
            checkInput(fields[i]) ? removeError(fields[i]) : removeCheckImg(fields[i]);
        });
    }
}

function form(selector, redirect) {
    const form = document.querySelector(selector)
    if (!form) {
        return;
    }

    const fields = form.querySelectorAll('.inputField');

    validateInput(fields)

    form.addEventListener('submit', function (event) {
        event.preventDefault()
        let user = {}
        let isValid = true;
        for (let i = 0; i < fields.length; i++) {
            if (!fields[i].checked || !fields[i].value) {
                fields[i].closest('.input-container').querySelector('.error-text').classList.add('show')
                console.log('fields[i]: ',fields[i])
                form[i].parentElement.classList.add('error-validate')
            }
            isValid &= checkInput(fields[i]);
            user[fields[i].name] = fields[i].value
        }

        if(isValid) {
            window.location.href = redirect;
        }
    })
}

function testCheck(input) {
    let checkbox = document.getElementById('acceptPrivacy')
    checkbox.checked ? removeError(input) : input.closest('.input-container').querySelector('.error-text').classList.add('show')
}