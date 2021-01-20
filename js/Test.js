form('.validate-form-page1', '/Tamplate-MW/pages/registration_page_2.html');
form('.validate-form-page2', '/Tamplate-MW/pages/Thank_you_page.html');
function checkInput(input) {
    var nameReg = /\b([a-z]+[ ]*)+/g;
    var onlyNumber = /^[0-9()\-+ ]+$/;
    var email = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/;
    var reg;
    var type = input.type, value = input.value;
    if (type === 'checkbox') {
        return input.checked;
    }
    switch (type) {
        case 'text':
        case 'password':
            reg = nameReg;
            break;
        case 'email':
            reg = email;
            break;
        case 'tel':
            reg = onlyNumber;
            break;
    }
    return value.length > 3 && reg.test(value);
}
var removeError = function (input) {
    var error = input.closest('.input-container').querySelector('.error-text');
    var checkValidate = input.closest('.validate-input').querySelector('.focus-input100');
    input.parentElement.classList.remove('error-validate');
    error.classList.remove('show');
    checkValidate.classList.add('true-validate');
};
var testCheck = function (input) {
    var error = input.closest('.input-container').querySelector('.error-text');
    input.parentElement.classList.remove('error-validate');
    error.classList.remove('show');
};
function removeCheckImg(input) {
    input.closest('.validate-input').querySelector('.focus-input100').classList.remove('true-validate');
}
function validateInput(fields) {
    var _loop_1 = function (i) {
        fields[i].addEventListener('keyup', function () {
            checkInput(fields[i]) ? removeError(fields[i]) : removeCheckImg(fields[i]);
        });
    };
    for (var i = 0; i < fields.length; i++) {
        _loop_1(i);
    }
}
var acceptPrivacy = document.querySelector('#acceptPrivacy');
acceptPrivacy.addEventListener('change', function (event) {
    this.checked ? testCheck(this) : removeCheckImg(this);
});
function form(selector, redirect) {
    var form = document.querySelector(selector);
    if (!form) {
        return;
    }
    var fields = form.querySelectorAll('.inputField');
    validateInput(fields);
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        var user = {};
        var isValid = true;
        for (var i = 0; i < fields.length; i++) {
            if (!fields[i].value) {
                fields[i].closest('.input-container').querySelector('.error-text').classList.add('show');
                form[i].parentElement.classList.add('error-validate');
            }
            if (fields[i].type === 'checkbox' && !fields[i].checked) {
                fields[i].closest('.input-container').querySelector('.error-text').classList.add('show');
            }
            isValid = checkInput(fields[i]);
            user[fields[i].name] = fields[i].value;
        }
        if (isValid) {
            window.location.href = redirect;
        }
    });
}
document.getElementById('phone-input').addEventListener('input', function (e) {
    var USNumber = e.target.value.match(/(\d{3})(\d{3})(\d{4})/);
    e.target.value = "+38 (" + USNumber[1] + ") " + USNumber[2] + "-" + USNumber[3];
});
