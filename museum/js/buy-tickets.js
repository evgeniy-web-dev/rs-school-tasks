const form = document.getElementById('buy-tickets-form');
const formMain = document.getElementById('buy-tickets-form-main');

const total = form.querySelector('.total i');
const totalMain = formMain.querySelector('.total span');

let formFields = {
    'amountBasic': 0,
    'amountSenior': 0,
    'ticketType': 'permanent'
};
const ticketPriceBasic = {
    'permanent': 20,
    'temporary': 25,
    'combined': 40
}

document.querySelectorAll('.spinner-step').forEach(el => el.addEventListener("click", spinnerStep));
formMain.querySelectorAll('.validate').forEach(el => el.addEventListener('change', validateFormField));
formMain.querySelectorAll('.validate').forEach(el => el.addEventListener('input', resetValidationErrors));

function spinnerStep() {
    switch (this.dataset['action']) {
        case 'stepUp':
            this.previousElementSibling.stepUp();
            break;
        case 'stepDown':
            this.nextElementSibling.stepDown();
            break;
    }
    this.closest('form').dispatchEvent(new Event('change'));
}

form.addEventListener('change', function (e) {
    this.querySelectorAll('input').forEach(
        el => {
            if (el.type === 'radio') {
                if (el.checked) {
                    formFields[el.name] = el.value;
                }
            } else {
                formFields[el.name] = el.value;
            }
        }
    );
    updateFormFields();
    updateTotals();
    saveDataToLocalStorage();
})

formMain.addEventListener('change', function (e) {
    this.querySelectorAll('input, select').forEach(
        el => {
            formFields[el.name] = el.value;
        }
    );

    validateFormFields();
    updateFormFields();
    updateTotals();
    saveDataToLocalStorage();
})

function updateTotals() {
    total.textContent = calculateTotal();

    formMain.querySelectorAll('.calculated-total').forEach(
        el => {
            switch (el.dataset['type']) {
                case 'senior-price':
                    el.textContent = ticketPriceBasic[formFields['ticketType']] / 2;
                    break;
                case 'basic-price':
                    el.textContent = ticketPriceBasic[formFields['ticketType']];
                    break;
                case 'basic-amount':
                    el.textContent = formFields['amountBasic'];
                    break;
                case 'senior-amount':
                    el.textContent = formFields['amountSenior'];
                    break;
                case 'basic-total-price':
                    el.textContent = formFields['amountBasic'] * ticketPriceBasic[formFields['ticketType']];
                    break;
                case 'senior-total-price':
                    el.textContent = formFields['amountSenior'] * ticketPriceBasic[formFields['ticketType']] / 2;
                    break;
                case 'visit-type':
                    el.textContent = formFields['ticketType'];
                    break;
                case 'total-price':
                    el.textContent = calculateTotal();
                    break;
                case 'date':
                    if (formFields['date']) {
                        let date = new Date(formFields['date']);
                        let options = { weekday: 'long', month: 'long', day: 'numeric' };
                        el.textContent = date.toLocaleDateString('en-US', options) ?? '';
                    }
                    break;
                case 'time':
                    el.textContent = formFields['time'] ?? '';
                    break;
            }
        }
    )
}

function calculateTotal() {
    return formFields.amountBasic * ticketPriceBasic[formFields.ticketType] + formFields.amountSenior * ticketPriceBasic[formFields.ticketType] / 2;
}

function saveDataToLocalStorage() {
    localStorage.buyTicketsForm = JSON.stringify(formFields);
}

function getDataFromLocalStorage() {
    if (localStorage.buyTicketsForm) {
        formFields = JSON.parse(localStorage.buyTicketsForm);
    }
}

function updateFormFields() {
    for (let field in formFields) {
        let el = form.querySelector(`[name='${field}']`);
        if (el) {
            if (el.type === 'radio') {
                form.querySelector(`[name='${field}'][value='${formFields[field]}']`).checked = true;
            } else {
                el.value = formFields[field];
            }
        }

        let elMain = formMain.querySelector(`[name='${field}']`);
        if (elMain) {
            if (elMain.type === 'select') {
                formMain.querySelector(`option[value='${formFields[field]}']`).selected = true;
            } else {
                elMain.value = formFields[field];
            }
        }
    }

    //console.log(formFields);
}

function resetValidationErrors() {
    formMain.querySelectorAll('.validate').forEach(el => { resetValidationError(null, el) });
}

function resetValidationError(event, el) {
    if (el && el.classList.contains('validate')) {
        let error = el.parentNode.querySelector('.error');
        error.innerHTML = '';
    }
}

function validateFormFields() {
    formMain.querySelectorAll('.validate').forEach(el => { validateFormField(null, el) });
}

function validateFormField(event, el) {
    el = el || this;

    if (el && el.classList.contains('validate')) {
        let error = el.parentNode.querySelector('.error');
        if (!el.validity.valid) {
            error.innerHTML = el.dataset['validationError'];
        } else {
            resetValidationError(el);
        }
    }
}

function initForm() {
    // set min date
    formMain.querySelector('input[name=date]').min = (new Date()).toISOString().split('T')[0];

    //set time datalist
    let timeDataList = [];
    let minTime = 9;
    let maxTime = 18;
    for (let i = minTime; i < maxTime; i++) {
        let hour = ('0' + i).slice(-2);
        timeDataList.push(`${hour}:00`, `${hour}:30`)
    }
    timeDataList.push(`${maxTime}:00`);
    document.getElementById('time-options').innerHTML = timeDataList.reduce((html, el) => (html += `<option value="${el}"></option>`, html), '');

    formMain.querySelector('input[name=time]').addEventListener('change', function (e) {
        this.value = this.value > `${maxTime}:00` ? `${maxTime}:00` : this.value < `0${minTime}:00` ? `0${minTime}:00` : this.value;
    });

    getDataFromLocalStorage();
    updateFormFields();
    validateFormFields();
    updateTotals();
}

initForm();