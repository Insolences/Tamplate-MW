form('.validate-form-page1', '/Tamplate-MW/pages/registration_page_2.html');
form('.validate-form-page2', '/Tamplate-MW/pages/Thank_you_page.html');

function checkInput(input){
    const nameReg= /\b([a-z]+[ ]*)+/g;
    const onlyNumber = /^[0-9()\-+ ]+$/;
    const email = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/;
    let reg;
    let {type, value} = input;

    if(type === 'checkbox'){
        return input.checked;
    }

    switch (type) {
        case 'text':
        case 'password':
            reg = nameReg;
            break;
        case 'email': reg = email;
            break;
        case 'tel': reg = onlyNumber;
            break;
    }
    return  value.length > 3  && reg.test(value);
}

const removeError = function (input) {
    let error = input.closest('.input-container').querySelector('.error-text');
    let checkValidate = input.closest('.validate-input').querySelector('.focus-input100');
    input.parentElement.classList.remove('error-validate');
    error.classList.remove('show');
    checkValidate.classList.add('true-validate');
}

const testCheck = function (input) {
    let error = input.closest('.input-container').querySelector('.error-text');
    input.parentElement.classList.remove('error-validate');
    error.classList.remove('show');
}

function removeCheckImg (input) {
    input.closest('.validate-input').querySelector('.focus-input100').classList.remove('true-validate');
}

function validateInput (fields) {
    for (let i = 0; i < fields.length; i++) {
        fields[i].addEventListener('keyup', function() {
            checkInput(fields[i]) ? removeError(fields[i]) : removeCheckImg(fields[i]);
        });
    }
}

const acceptPrivacy = document.querySelector('#acceptPrivacy')

acceptPrivacy.addEventListener('change', function (event){
    this.checked ? testCheck(this) : removeCheckImg(this);
})

function form(selector, redirect) {
    const form = document.querySelector(selector);
    if (!form) {
        return;
    }

    const fields = form.querySelectorAll('.inputField');

    validateInput(fields);

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        let user = {};
        let isValid = true;
        for (let i = 0; i < fields.length; i++) {
            if (!fields[i].value  ) {
                fields[i].closest('.input-container').querySelector('.error-text').classList.add('show');
                form[i].parentElement.classList.add('error-validate');
            }
            if(fields[i].type ==='checkbox' && !fields[i].checked) {
                fields[i].closest('.input-container').querySelector('.error-text').classList.add('show');
            }

            isValid &= checkInput(fields[i]);
            user[fields[i].name] = fields[i].value;
        }
        if(isValid) {
            window.location.href = redirect;
        }
    })
}

document.getElementById('phone-input').addEventListener('input', function (e) {
    let USNumber =  e.target.value.match(/(\d{3})(\d{3})(\d{4})/);
    e.target.value = "+38 (" + USNumber[1] + ") " + USNumber[2] + "-" + USNumber[3];
});

