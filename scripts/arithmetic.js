
//Operations
const sum = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiplication = (a, b) => a * b;
const division = (a, b) => a / b;
const remainder = (a, b) => a % b;

const OPERATIONS = {
    "×": { precedence: 1, process: multiplication },
    "÷": { precedence: 1, process: division },
    "%": { precedence: 1, process: remainder },
    "+": { precedence: 0, process: sum },
    "-": { precedence: 0, process: subtract },
}

const getPrecedence = operator => OPERATIONS[operator].precedence;
/**
 * Do the operation based on the operator  
 * @param {*} a numberA
 * @param {*} b numberB 
 * @param {*} operator char operator
 * @returns 
 */
function operation(a, b, operator) {
    return OPERATIONS[operator].process(a, b);
}
/**
 * Order the operators based precedence 
 * @returns 
 */
function orderOperators(operators) {
    const result = operators.toSorted((operatorA, operatorB) => {
        let precedenceA = getPrecedence(operatorA);
        let precedenceB = getPrecedence(operatorB);
        if (precedenceA < precedenceB) return 1;
        else if (precedenceA === precedenceB) return 0;
        return -1;
    });
    return result;
}
/**
 * Calculate the expression entered by the user, by precedence  
 * @param {*} enteredValue obj {numbers: [], operators: []}
 * @returns 
 */
export function calculate(enteredValue) {
    const ONE = 1;
    const numbers = enteredValue.numbers;
    const operators = enteredValue.operators;
    const orderedOperators = orderOperators(operators);
    let operationsCount = 0;
    orderedOperators.forEach(el => {
        //If the the operation is the first or the last the index its equal to its value otherwise it's value is equal to the index minus one because we change the array with the splice method 
        const index = (operationsCount > 0 && operators.indexOf(el) != 0) ? operators.indexOf(el) - ONE : operators.indexOf(el);
        const result = operation(numbers[index], numbers[index + ONE], el);
        numbers.splice(index, 2, result);
        operationsCount++;
    });
    return numbers[0];
}