import { Calculator } from './calculator.js';

const calculator = new Calculator();

const resultDisplay = document.getElementById('result');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const trigButtons = document.querySelectorAll('.trig');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');
const plusMinusButton = document.querySelector('.operator:nth-child(2)');

function updateDisplay() {
    resultDisplay.value = calculator.getDisplay();
}

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.inputNumber(button.textContent);
        updateDisplay();
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.textContent === '±') {
            calculator.plusMinus();
            updateDisplay();
            return;
        }
        if (button.textContent === '%') {
            calculator.percent();
            updateDisplay();
            return;
        }
        calculator.setOperator(button.textContent);
        updateDisplay();
    });
});

trigButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.trig(button.textContent);
        updateDisplay();
    });
});

equalsButton.addEventListener('click', () => {
    try {
        calculator.calculate();
    } catch (e) {
        alert(e.message);
    }
    updateDisplay();
});

clearButton.addEventListener('click', () => {
    calculator.clear();
    updateDisplay();
});

document.addEventListener('keydown', (event) => {
    if ([
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/', 'Enter', 'Escape', 'Backspace'
    ].includes(event.key)) {
        event.preventDefault();
    }
    if (/^[0-9]$/.test(event.key)) {
        calculator.inputNumber(event.key);
        updateDisplay();
        simulateButtonPress(findButtonByText(event.key));
    }
    if (event.key === '.') {
        calculator.inputDecimal();
        updateDisplay();
        simulateButtonPress(findButtonByText('.'));
    }
    switch (event.key) {
        case '+':
            calculator.setOperator('+');
            simulateButtonPress(findButtonByText('+'));
            break;
        case '-':
            calculator.setOperator('-');
            simulateButtonPress(findButtonByText('-'));
            break;
        case '*':
            calculator.setOperator('×');
            simulateButtonPress(findButtonByText('×'));
            break;
        case '/':
            calculator.setOperator('÷');
            simulateButtonPress(findButtonByText('÷'));
            break;
        case 'Enter':
            try {
                calculator.calculate();
            } catch (e) {
                alert(e.message);
            }
            updateDisplay();
            simulateButtonPress(equalsButton);
            break;
        case 'Escape':
            calculator.clear();
            updateDisplay();
            simulateButtonPress(clearButton);
            break;
        case 'Backspace':
            calculator.backspace();
            updateDisplay();
            break;
    }
});

function simulateButtonPress(button) {
    if (!button) return;
    button.classList.add('active');
    setTimeout(() => {
        button.classList.remove('active');
    }, 100);
}

function findButtonByText(text) {
    const allButtons = [...numberButtons, ...operatorButtons, ...trigButtons, equalsButton, clearButton];
    return allButtons.find(button => button.textContent === text);
}
