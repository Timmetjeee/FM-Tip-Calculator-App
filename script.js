let bill = 0, tip = 0, people = 1;

const billInput = document.getElementsByName('bill')[0];
billInput.addEventListener('input', ({target}) => {
    if (target.value.length > 0 && target.value <= 0) {
        target.parentElement.classList.add('invalid');
        return;
    } else {
        target.parentElement.classList.remove('invalid');
    }    

    bill = parseFloat(target.value) || 0;
    reload();
});

const buttons = document.getElementsByClassName('button-dark');
let activeButton;

for (let button of buttons) {
    button.addEventListener('click', () => {
        setTip(button.textContent);
        activeButton = button;
        button.classList.add('active');
    });
}

const tipInput = document.getElementsByName('tip')[0];
tipInput.addEventListener('input', handleCustomTip);
tipInput.addEventListener('focus', handleCustomTip);

function handleCustomTip({target}) {
    setTip(target.value);
    activeButton = null;
}

function setTip(newTip) {
    tip = parseFloat(newTip);

    if (activeButton != null)
        activeButton.classList.remove('active');
    reload();    
}

const peopleInput = document.getElementsByName('people')[0];
peopleInput.addEventListener('input', ({target}) => {
    if (target.value.length > 0 && target.value <= 0) {
        target.parentElement.classList.add('invalid');
        return;
    } else {
        target.parentElement.classList.remove('invalid');
    }    

    people = parseInt(target.value) || 1;
    reload();
})
const tipElement = document.querySelector('#tip-amount'), totalElement = document.querySelector('#total'), resetButton = document.getElementsByClassName('button-reset')[0];

function reload() {
    const totalTip = bill * tip / 100 || 0;

    const tipPerPerson = totalTip / people;
    tipElement.textContent = "$" + (tipPerPerson > 999 ? tipPerPerson.toExponential(0) : tipPerPerson.toFixed(2));

    const totalPerPerson = bill / people + tipPerPerson;
    totalElement.textContent = "$" + (totalPerPerson > 9999 ? totalPerPerson.toExponential(0) : totalPerPerson.toFixed(2));

    if (bill || tip)
        resetButton.removeAttribute('disabled');
    else
        resetButton.setAttribute('disabled', true);
}
resetButton.addEventListener('click', reset);

function reset() {
    bill = 0;
    billInput.value = "";

    setTip(0);
    tipInput.value = "";

    people = 1;
    peopleInput.value = "";

    reload();
}