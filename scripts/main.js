//Grab the buttons
const buttons = document.querySelector('.buttons');
const carry = document.querySelector('.carry');
const input = document.querySelector('.input');
const enteredValues = [];
input.value = "";
carry.innerText = "";
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
    "+": sum,
    "-": subtract,
    "%": remainder,
    "×": multiplication,
    "÷": division,
}
const PROCEDURES = {
    "CE": clearLastEntered,
    "C": clearInput
}
// create a operation function 
const operation = (a, b, operator) => OPERATIONS[operator](a, b);

//Show in carry
const showInCarry = (data) => carry.innerText += data;

//Show in carry
const showInInput = number => input.value += number;
// Add the listeners
buttons.addEventListener('click', (ev) => {
    const dataEntered = ev.target.innerText;
    const parsedInput = parseFloat(dataEntered);
    if (isNaN(parsedInput)) {
        if (dataEntered === ".")
            showInInput(".");
        // if the operator enter is not a operation, do that procedure
        else if (!(dataEntered in OPERATIONS)) {
            PROCEDURES[dataEntered]();
        }
        else if (dataEntered === "+" || dataEntered === "-") {
            enteredValues.push(parseFloat(input.value), dataEntered);
            showInCarry(input.value + dataEntered);
            clearInput();
        }
    }
    else
        showInInput(`${parsedInput}`);
})