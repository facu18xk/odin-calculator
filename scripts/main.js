import { calculate } from "./arithmetic";

const buttons = document.querySelector('.buttons');
const carry = document.querySelector('.carry');
const input = document.querySelector('.input');
const dataEntered = {};
let lastEntered = "";
input.value = "";
carry.innerText = "";

const showInCarry = data => carry.innerText += data;
const showInInput = number => input.value += number;
const clearCarry = () => carry.innerText = "";
const clearInput = () => input.value = "";
const clearLastEntered = () => input.value = input.value.slice(0, -1);
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
 * Do the operation and show in the screen 
 */
function resolve() {
    // If the last entered data is not a number send alert
    if (isNaN(parseFloat(lastEntered))) alert("Enter a correct value");
    clearCarry()
    showInCarry(input.value);
    clearInput();
    showInInput(calculate(getInput()));
    dataEntered = {};
}
function getInput() {

}
buttons.addEventListener('click', (ev) => {
    const buttonValue = ev.target.textContent;
    if (buttonValue in PROCEDURES) {
        PROCEDURES[buttonValue]();
    }

})

//Allow only numbers and .
input.addEventListener('input', () => {
    input.value = input.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
})