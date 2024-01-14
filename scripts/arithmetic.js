
/**
 * 1.Create an object with the operations, one specific for arithmetic operations and other for especial operations like CE or result  
 * 2. Create the operations
 * 3. Create a operation function that operates one time  
 * 4. Create a operations function that operates a list of operations 
 */
const ARITHMETIC_OPERATIONS = {
    "+": { precedence: 0, sum },
    "-": { precedence: 0, subtract },
    "×": { precedence: 1, multiplication },
    "÷": { precedence: 1, division },
    "%": { precedence: 1, remainder }
}

function sum(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiplication(a, b) {
    return a * b;
}

function division(a, b) {
    return a / b;
}

function remainder(a, b) {
    return a / b
}

