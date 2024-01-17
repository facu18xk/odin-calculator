import { calculate } from "./arithmetic.js";

const buttons = document.querySelector('.buttons');
const carry = document.querySelector('.carry');
const input = document.querySelector('.input');
let lastEntered = "";
let resultInScreen = false;
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
            lastStart = index + 1;
        }
        if (index === char.length - 1) {
            const strNumber = data.slice(lastStart, char.length);
            numbers.push(parseFloat(strNumber));
        }
    });
    return { numbers, operators };
}
/**
 * Do the operation and show in the screen 
 */
function resolve() {
    if (input.value == "") return;
    // If the last entered data is not a number send alert
    if (isNaN(parseFloat(lastEntered))) alert("Enter a correct value");
    clearCarry()
    showInCarry(input.value);
    clearInput();
    const result = calculate(parseData());
    if (typeof result == "boolean") return alert("Division by 0 is undefined");
    else showInInput(result);
    resultInScreen = true;
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
    if (buttonValue in PROCEDURES) {
        PROCEDURES[buttonValue]();
    }
    else {
        //If the value is a operator, verify that the previous value is a number otherwise throw an alert 
        if (isNaN(parseFloat(buttonValue))) {
            if (resultInScreen) {
                clearCarry();
                resultInScreen = false;
            }
            inputOperator(buttonValue);
            lastEntered = buttonValue;
        }
        else {
            if (resultInScreen) {
                clearInput();
                resultInScreen = false;
            }
            input.value += buttonValue;
            lastEntered = buttonValue;
        }
    }
})
//Allow only numbers and .
input.addEventListener('input', () => {
    input.value = input.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
})
