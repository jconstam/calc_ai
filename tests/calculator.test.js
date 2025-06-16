import { Calculator } from '../src/calculator.js';

describe('Calculator', () => {
    let calculator;

    beforeEach(() => {
        calculator = new Calculator();
    });

    describe('Number Input', () => {
        test('should handle single digit input', () => {
            expect(calculator.inputNumber('5')).toBe('5');
        });

        test('should handle multiple digit input', () => {
            calculator.inputNumber('1');
            calculator.inputNumber('2');
            calculator.inputNumber('3');
            expect(calculator.getDisplay()).toBe('123');
        });

        test('should handle decimal point', () => {
            calculator.inputNumber('1');
            calculator.inputDecimal();
            calculator.inputNumber('5');
            expect(calculator.getDisplay()).toBe('1.5');
        });

        test('should not allow multiple decimal points', () => {
            calculator.inputNumber('1');
            calculator.inputDecimal();
            calculator.inputNumber('5');
            calculator.inputDecimal();
            expect(calculator.getDisplay()).toBe('1.5');
        });
    });

    describe('Basic Operations', () => {
        test('should perform addition', () => {
            calculator.inputNumber('5');
            calculator.setOperator('+');
            calculator.inputNumber('3');
            expect(calculator.calculate()).toBe('8');
        });

        test('should perform subtraction', () => {
            calculator.inputNumber('5');
            calculator.setOperator('-');
            calculator.inputNumber('3');
            expect(calculator.calculate()).toBe('2');
        });

        test('should perform multiplication', () => {
            calculator.inputNumber('5');
            calculator.setOperator('×');
            calculator.inputNumber('3');
            expect(calculator.calculate()).toBe('15');
        });

        test('should perform division', () => {
            calculator.inputNumber('6');
            calculator.setOperator('÷');
            calculator.inputNumber('2');
            expect(calculator.calculate()).toBe('3');
        });

        test('should prevent division by zero', () => {
            calculator.inputNumber('5');
            calculator.setOperator('÷');
            calculator.inputNumber('0');
            expect(() => calculator.calculate()).toThrow('Cannot divide by zero!');
        });

        test('should not set operator with empty input', () => {
            calculator.setOperator('+');
            expect(calculator.getDisplay()).toBe('');
            expect(calculator.operation).toBeNull();
        });

        it('should handle invalid operation', () => {
            calculator.inputNumber('5');
            calculator.setOperator('invalid');
            calculator.inputNumber('3');
            expect(calculator.calculate()).toBeUndefined();
        });

        it('should not calculate when both inputs are empty', () => {
            const calc = new Calculator();
            expect(calc.calculate()).toBeUndefined();
        });

        it('should not calculate when currentInput is empty', () => {
            const calc = new Calculator();
            calc.inputNumber('5');
            calc.setOperator('+');
            // simulate user not entering second number
            calc.currentInput = '';
            expect(calc.calculate()).toBeUndefined();
        });

        it('should not set operator if currentInput is empty', () => {
            const calc = new Calculator();
            expect(calc.setOperator('+')).toBeUndefined();
            expect(calc.operation).toBeNull();
        });

        it('should call calculate if previousInput is not empty', () => {
            const calc = new Calculator();
            calc.inputNumber('2');
            calc.setOperator('+');
            calc.inputNumber('3');
            calc.setOperator('-'); // This should call calculate
            expect(calc.previousInput).toBe('5'); // 2 + 3 = 5
            expect(calc.operation).toBe('-');
        });
    });

    describe('Special Functions', () => {
        test('should handle percentage', () => {
            calculator.inputNumber('50');
            expect(calculator.percent()).toBe('0.5');
        });

        test('should handle plus/minus toggle', () => {
            calculator.inputNumber('5');
            expect(calculator.plusMinus()).toBe('-5');
            expect(calculator.plusMinus()).toBe('5');
        });

        test('should clear display', () => {
            calculator.inputNumber('5');
            expect(calculator.clear()).toBe('');
            expect(calculator.getDisplay()).toBe('');
        });

        test('should handle backspace', () => {
            calculator.inputNumber('123');
            expect(calculator.backspace()).toBe('12');
            expect(calculator.backspace()).toBe('1');
            expect(calculator.backspace()).toBe('');
        });

        test('should not perform special functions with empty input', () => {
            expect(calculator.percent()).toBeUndefined();
            expect(calculator.plusMinus()).toBeUndefined();
            expect(calculator.backspace()).toBe('');
        });
    });

    describe('Trigonometric Functions', () => {
        test('should calculate sine', () => {
            calculator.inputNumber('90');
            expect(calculator.trig('sin')).toBe('1');
        });

        test('should calculate cosine', () => {
            calculator.inputNumber('0');
            expect(calculator.trig('cos')).toBe('1');
        });

        test('should calculate tangent', () => {
            calculator.inputNumber('45');
            expect(calculator.trig('tan')).toBe('1');
        });

        test('should not perform trig with empty input', () => {
            expect(calculator.trig('sin')).toBeUndefined();
        });

        test('should handle invalid trig function', () => {
            calculator.inputNumber('45');
            expect(calculator.trig('invalid')).toBeUndefined();
        });
    });

    describe('Operation Chaining', () => {
        test('should chain operations', () => {
            calculator.inputNumber('5');
            calculator.setOperator('+');
            calculator.inputNumber('3');
            calculator.setOperator('×');
            calculator.inputNumber('2');
            expect(calculator.calculate()).toBe('16');
        });

        test('should handle operation after equals', () => {
            calculator.inputNumber('5');
            calculator.setOperator('+');
            calculator.inputNumber('3');
            calculator.calculate();
            calculator.setOperator('×');
            calculator.inputNumber('2');
            expect(calculator.calculate()).toBe('16');
        });
    });
});
