const userInput = document.querySelector(".userInput");
const calculation = document.querySelector(".calculation");
const numberButton = document.querySelectorAll(".numberButton");
const operatorButton = document.querySelectorAll(".operatorButton");
const equalButton = document.querySelector(".equalButton");
const deleteButton = document.querySelector(".deleteButton");
const clearButton = document.querySelector(".clearButton");
let curentOperator = "initial";
let calculated = false;

numberButton.forEach(button => {
    button.addEventListener("click", () => {
        if (calculated) {
            clearScreen(userInput);
            clearScreen(calculation);
        }
        modifyUserInputScreen(button.textContent);
    });
});

operatorButton.forEach(button => {
    button.addEventListener("click", () => {
        curentOperator = button.textContent;
        modifyCalculationScreen();
        clearScreen(userInput);
        modifyUserInputScreen("0");
    });
});

clearButton.addEventListener("click", () => {
    clearScreen(userInput);
    clearScreen(calculation);
    userInput.textContent = "0";
});

deleteButton.addEventListener("click", () => {
    if (userInput.textContent < 10) {
        userInput.textContent = "0";
    }
    else {
        userInput.textContent = userInput.textContent.slice(0, -1);
    }
});

equalButton.addEventListener("click", () => {
    compute();
});

function modifyUserInputScreen(number) {
    if (userInput.textContent.length > 7) {
        return;
    }
    else {
        if (userInput.textContent === "0") {
            userInput.textContent = number;
        }
        else {
            userInput.textContent = userInput.textContent + number;
        }
    }
}

function modifyCalculationScreen() {
    if (userInput.textContent === "0" || curentOperator === "initial") {
        return;
    }
    else {
        calculation.textContent = userInput.textContent + " " + curentOperator;
    }
}

function clearScreen(screen) {
    screen.textContent = "";
    calculated = false;
    clearWarning();
}

function maxLenght(number) {
    if (number.textContent.length > 7) {
        number.textContent = number.textContent.slice(0, 7 - number.textContent.length);
        
        const warning = document.querySelector(".warning");
        warning.textContent = "Calculator is unable to show the exact result of the calculation";
    }
    else
    {
        clearWarning();
    }
}

function clearWarning()
{
    const warning = document.querySelector(".warning");
        if(warning.children != null)
        {
            warning.textContent = "";
        }
}

function compute() {
    let calculationNumber = calculation.textContent;

    if (curentOperator === "initial") {
        return;
    }

    if (curentOperator === "+") {
        calculation.textContent = calculationNumber + " " + userInput.textContent + " = ";
        userInput.textContent = Number(userInput.textContent) + Number(calculationNumber.slice(0, -1));

    }
    else if (curentOperator === "-") {
        calculation.textContent = calculationNumber + " " + userInput.textContent + " = ";
        userInput.textContent = Number(calculationNumber.slice(0, -1)) - Number(userInput.textContent);
    }
    else if (curentOperator === "x") {
        calculation.textContent = calculationNumber + " " + userInput.textContent + " = ";
        userInput.textContent = Number(userInput.textContent) * Number(calculationNumber.slice(0, -1));
    }
    else if (curentOperator === "÷") {
        calculation.textContent = calculationNumber + " " + userInput.textContent + " = ";
        userInput.textContent = Number(calculationNumber.slice(0, -1)) / Number(userInput.textContent);
    }

    curentOperator = "initial";
    calculated = true;
    maxLenght(userInput);
}