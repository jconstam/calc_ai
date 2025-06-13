class Calculator {
    constructor() {
        this.clear();
    }

    inputNumber(num) {
        if (this.shouldResetScreen) {
            this.currentInput = '';
            this.shouldResetScreen = false;
        }
        this.currentInput += num;
        return this.currentInput;
    }

    inputDecimal() {
        if (this.shouldResetScreen) {
            this.currentInput = '0.';
            this.shouldResetScreen = false;
        } else if (!this.currentInput.includes('.')) {
            this.currentInput += '.';
        }
        return this.currentInput;
    }

    setOperator(op) {
        if (this.currentInput === '') return;
        if (this.previousInput !== '') {
            this.calculate();
        }
        this.operation = op;
        this.previousInput = this.currentInput;
        this.shouldResetScreen = true;
    }

    calculate() {
        if (this.previousInput === '' || this.currentInput === '') return;
        let result;
        const prev = parseFloat(this.previousInput);
        const current = parseFloat(this.currentInput);
        switch (this.operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '×':
                result = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    this.clear();
                    throw new Error('Cannot divide by zero!');
                }
                result = prev / current;
                break;
            default:
                return;
        }
        this.currentInput = result.toString();
        this.operation = null;
        this.previousInput = '';
        this.shouldResetScreen = true;
        return this.currentInput;
    }

    plusMinus() {
        if (this.currentInput === '') return;
        this.currentInput = (-parseFloat(this.currentInput)).toString();
        return this.currentInput;
    }

    percent() {
        if (this.currentInput === '') return;
        this.currentInput = (parseFloat(this.currentInput) / 100).toString();
        return this.currentInput;
    }

    trig(func) {
        if (this.currentInput === '') return;
        const value = parseFloat(this.currentInput);
        let result;
        switch (func) {
            case 'sin':
                result = Math.sin((value * Math.PI) / 180);
                break;
            case 'cos':
                result = Math.cos((value * Math.PI) / 180);
                break;
            case 'tan':
                result = Math.tan((value * Math.PI) / 180);
                break;
            default:
                return;
        }
        result = Math.round(result * 100000000) / 100000000;
        this.currentInput = result.toString();
        return this.currentInput;
    }

    backspace() {
        this.currentInput = this.currentInput.slice(0, -1);
        return this.currentInput;
    }

    clear() {
        this.currentInput = '';
        this.previousInput = '';
        this.operation = null;
        this.shouldResetScreen = false;
        return this.currentInput;
    }

    getDisplay() {
        return this.currentInput;
    }
}

export { Calculator };
