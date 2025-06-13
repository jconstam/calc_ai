import { Calculator } from '../src/calculator.js';

describe('Calculator', () => {
    let calculator;

    beforeEach(() => {
        calculator = new Calculator();
    });

    describe('Number Input', () => {
        test('should handle single digit input', () => {
            calculator.inputNumber('5');
            expect(calculator.getDisplay()).toBe('5');
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
            calculator.calculate();
            expect(calculator.getDisplay()).toBe('8');
        });

        test('should perform subtraction', () => {
            calculator.inputNumber('5');
            calculator.setOperator('-');
            calculator.inputNumber('3');
            calculator.calculate();
            expect(calculator.getDisplay()).toBe('2');
        });

        test('should perform multiplication', () => {
            calculator.inputNumber('5');
            calculator.setOperator('×');
            calculator.inputNumber('3');
            calculator.calculate();
            expect(calculator.getDisplay()).toBe('15');
        });

        test('should perform division', () => {
            calculator.inputNumber('6');
            calculator.setOperator('÷');
            calculator.inputNumber('2');
            calculator.calculate();
            expect(calculator.getDisplay()).toBe('3');
        });

        test('should prevent division by zero', () => {
            calculator.inputNumber('5');
            calculator.setOperator('÷');
            calculator.inputNumber('0');
            expect(() => calculator.calculate()).toThrow('Cannot divide by zero!');
        });
    });

    describe('Special Functions', () => {
        test('should handle percentage', () => {
            calculator.inputNumber('50');
            calculator.percent();
            expect(calculator.getDisplay()).toBe('0.5');
        });

        test('should handle plus/minus toggle', () => {
            calculator.inputNumber('5');
            calculator.plusMinus();
            expect(calculator.getDisplay()).toBe('-5');
            calculator.plusMinus();
            expect(calculator.getDisplay()).toBe('5');
        });

        test('should clear display', () => {
            calculator.inputNumber('5');
            calculator.clear();
            expect(calculator.getDisplay()).toBe('');
        });

        test('should handle backspace', () => {
            calculator.inputNumber('123');
            calculator.backspace();
            expect(calculator.getDisplay()).toBe('12');
        });
    });

    describe('Trigonometric Functions', () => {
        test('should calculate sine', () => {
            calculator.inputNumber('30');
            calculator.trig('sin');
            expect(Number(calculator.getDisplay())).toBeCloseTo(0.5, 2);
        });

        test('should calculate cosine', () => {
            calculator.inputNumber('60');
            calculator.trig('cos');
            expect(Number(calculator.getDisplay())).toBeCloseTo(0.5, 2);
        });

        test('should calculate tangent', () => {
            calculator.inputNumber('45');
            calculator.trig('tan');
            expect(Number(calculator.getDisplay())).toBeCloseTo(1, 2);
        });
    });

    describe('Operation Chaining', () => {
        test('should chain operations', () => {
            calculator.inputNumber('5');
            calculator.setOperator('+');
            calculator.inputNumber('3');
            calculator.setOperator('×');
            calculator.inputNumber('2');
            calculator.calculate();
            expect(calculator.getDisplay()).toBe('16');
        });

        test('should handle operation after equals', () => {
            calculator.inputNumber('5');
            calculator.setOperator('+');
            calculator.inputNumber('3');
            calculator.calculate();
            calculator.setOperator('×');
            calculator.inputNumber('2');
            calculator.calculate();
            expect(calculator.getDisplay()).toBe('16');
        });
    });
});
