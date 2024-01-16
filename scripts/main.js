import { calculate } from "./arithmetic.js";

const buttons = document.querySelector('.buttons');
const carry = document.querySelector('.carry');
const input = document.querySelector('.input');
let dataEntered = { numbers: [], operators: [] };
let lastEntered = "";
input.value = "";
carry.innerText = "";

const showInCarry = data => carry.innerText += data;
const showInInput = number => input.value += number;
const clearCarry = () => carry.innerText = "";
const clearInput = () => input.value = "";
const clearLastEntered = () => input.value = input.value.slice(0, -1);
const getCarry = () => carry.textContent;
const PROCEDURES = {
    "CE": clearLastEntered,
    "=": resolve
    ,
    "C": () => {
        clearInput();
        clearCarry();
    },
}
/**
 * Parse the data into the input into an array of numbers and operators
 * @returns obj 
 */
// 12 + 12
function parseData() {
    const numbers = [];
    const operators = [];
    const data = getCarry();
    const char = data.split("");
    let lastStart = 0;
    char.forEach((el, index) => {
        const numberValue = parseFloat(el);
        if (isNaN(numberValue) && el != ".") {
            const strNumber = data.slice(lastStart, index);
            operators.push(el);
            numbers.push(parseFloat(strNumber));
            lastStart = index;
        }
        if (index === char.length - 1) {
            console.log("Hello");
            const strNumber = data.slice(lastStart + 1, char.length);
            numbers.push(parseFloat(strNumber));
        }
    });
    return { numbers, operators };
}
/**
 * Do the operation and show in the screen 
 */
function resolve() {
    // If the last entered data is not a number send alert
    if (isNaN(parseFloat(lastEntered))) alert("Enter a correct value");
    clearCarry()
    showInCarry(input.value);
    clearInput();
    showInInput(calculate(parseData()));
    dataEntered = { numbers: [], operators: [] };
}

function inputOperator(operator) {
    if (isNaN(parseFloat(lastEntered)))
        alert("Please enter a valid input 🙏");
    else {
        input.value += operator;
    }
}

buttons.addEventListener('click', (ev) => {
    const buttonValue = ev.target.textContent;
    console.log(ev);
    if (buttonValue in PROCEDURES) {
        PROCEDURES[buttonValue]();
    }
    else {
        //If the value is a operator, verify that the previous value is a number otherwise throw an alert 
        if (isNaN(parseFloat(buttonValue))) {
            inputOperator(buttonValue);
            lastEntered = buttonValue;
        }
        else {
            input.value += buttonValue;
            lastEntered = buttonValue;
        }
    }
})

//Allow only numbers and .
input.addEventListener('input', () => {
    input.value = input.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
})