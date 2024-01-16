//Grab the buttons
const buttons = document.querySelector('.buttons');
const carry = document.querySelector('.carry');
const input = document.querySelector('.input');
const enteredValues = [];
input.value = "";
carry.innerText = "";
const cache = {
    operationsToDo: false,
    operator: null,
    number: null,

    add(number, operator) {
        this.operationsToDo = true;
        this.operator = operator;
        this.number = number;
    },
    clear() {
        this.operationsToDo = false;
        this.operator = null;
        this.number = null;
    }
}
//create the operations 
const sum = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiplication = (a, b) => a * b;
const division = (a, b) => a / b;
const remainder = (a, b) => a % b;
const clearInput = () => input.value = "";
const clearLastEntered = () => input.value = input.value.slice(0, -1);
//Operations
const OPERATIONS = {
    lowPriority: {
        "+": sum,
        "-": subtract
    },
    highPriority: {
        "%": remainder,
        "×": multiplication,
        "÷": division
    }
}
const PROCEDURES = {
    "CE": clearLastEntered,
    "C": clearInput,
    "=": operations
}
function operations() {

}
// create a operation function 
const operation = (a, b, operator) => operator in OPERATIONS.lowPriority ? OPERATIONS.lowPriority[operator](a, b) : OPERATIONS.highPriority[operator](a, b);

//Show in carry
const showInCarry = (data) => carry.innerText += data;

//Show in carry
const showInInput = number => input.value += number;

const clearCarry = () => carry.innerText = "";
function ifHighPriority() {

}
function operationsButtons(buttonValue) {
    if (buttonValue in PROCEDURES) {
        if (buttonValue != "=")
            PROCEDURES[buttonValue]();
        else {
            operations();
        }
    }
    else {
        if (buttonValue in OPERATIONS.lowPriority) {
            if (cache.operationsToDo) {
                const result = operation(cache.number, parseFloat(input.value), cache.operator);
                enteredValues.push(result, buttonValue);
                clearCarry();
                showInCarry(result + buttonValue);
                clearInput();
            }
            else {
                enteredValues.push(input.value, buttonValue);
            }
        }
        else {
            if (cache.operationsToDo) {
                //Add the result of the operation in the enteredValues array to continues doing operations if needed 
                showInCarry(input.value);
                const result = operation(cache.number, parseFloat(input.value), cache.operator);
                clearInput();
                cache.clear();
                cache.add(result, buttonValue);
                clearCarry();
                showInCarry(result + buttonValue);
            }
            else {
                showInCarry(input.value + buttonValue);
                cache.add(parseFloat(input.value), buttonValue);
                clearInput();
            }
        }
    }
}
function buttonsLogic(buttonValue) {
    const numberValue = parseFloat(buttonValue);
    //If is not number do something 
    if (isNaN(numberValue)) {
        operationsButtons(buttonValue);
    } else {
        showInInput(buttonValue);
    }
    //If is a number add to the input

}
buttons.addEventListener('click', (ev) => {
    const buttonValue = ev.target.innerText;
    buttonsLogic(buttonValue);
})

//Allow only numbers and .
input.addEventListener('input', () => {
    input.value = input.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
})