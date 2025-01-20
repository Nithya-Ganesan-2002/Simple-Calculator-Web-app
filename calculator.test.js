// Make Calculator class available from setup file

describe('Scientific Calculator Tests', () => {
    let calculator;

    beforeEach(() => {
        calculator = new Calculator();
        // Reset the DOM elements mock
        document.body.innerHTML = `
            <div id="resultArea"></div>
            <div id="opac"></div>
        `;
    });

    // Basic Operations Tests
    describe('Basic Operations', () => {
        test('addition should work correctly', () => {
            calculator.appendNumber(5);
            calculator.setOperation('+');
            calculator.appendNumber(3);
            calculator.calculate();
            expect(calculator.currentValue).toBe('8');
        });

        test('subtraction should work correctly', () => {
            calculator.appendNumber(8);
            calculator.setOperation('-');
            calculator.appendNumber(3);
            calculator.calculate();
            expect(calculator.currentValue).toBe('5');
        });

        test('multiplication should work correctly', () => {
            calculator.appendNumber(4);
            calculator.setOperation('*');
            calculator.appendNumber(3);
            calculator.calculate();
            expect(calculator.currentValue).toBe('12');
        });

        test('division should work correctly', () => {
            calculator.appendNumber(15);
            calculator.setOperation('/');
            calculator.appendNumber(3);
            calculator.calculate();
            expect(calculator.currentValue).toBe('5');
        });

        test('division by zero should return error', () => {
            calculator.appendNumber(5);
            calculator.setOperation('/');
            calculator.appendNumber(0);
            calculator.calculate();
            expect(calculator.currentValue).toBe('Error');
        });
    });

    // Scientific Functions Tests
    describe('Scientific Functions', () => {
        test('sin function in degrees mode', () => {
            calculator.setAngleMode('DEG');
            calculator.appendNumber(90);
            expect(calculator.sin(90)).toBeCloseTo(1, 10);
        });

        test('sin function in radians mode', () => {
            calculator.setAngleMode('RAD');
            expect(calculator.sin(Math.PI/2)).toBeCloseTo(1, 10);
        });

        test('cos function in degrees mode', () => {
            calculator.setAngleMode('DEG');
            calculator.appendNumber(0);
            expect(calculator.cos(0)).toBeCloseTo(1, 10);
        });

        test('cos function in radians mode', () => {
            calculator.setAngleMode('RAD');
            expect(calculator.cos(0)).toBeCloseTo(1, 10);
        });

        test('tan function in degrees mode', () => {
            calculator.setAngleMode('DEG');
            calculator.appendNumber(45);
            expect(calculator.tan(45)).toBeCloseTo(1, 10);
        });

        test('tan function in radians mode', () => {
            calculator.setAngleMode('RAD');
            expect(calculator.tan(Math.PI/4)).toBeCloseTo(1, 10);
        });

        test('log function with valid input', () => {
            expect(calculator.log(100)).toBe(2);
        });

        test('log function with invalid input', () => {
            expect(calculator.log(0)).toBe('Error');
            expect(calculator.log(-1)).toBe('Error');
        });

        test('sqrt function with valid input', () => {
            expect(calculator.sqrt(16)).toBe(4);
        });

        test('sqrt function with invalid input', () => {
            expect(calculator.sqrt(-1)).toBe('Error');
        });

        test('power function', () => {
            expect(calculator.power(2, 3)).toBe(8);
            expect(calculator.power(3, 2)).toBe(9);
        });
    });

    // Memory Functions Tests
    describe('Memory Functions', () => {
        test('memory store and recall', () => {
            calculator.appendNumber(5);
            calculator.memoryStore();
            calculator.clear();
            calculator.memoryRecall();
            expect(calculator.currentValue).toBe('5');
        });

        test('memory add', () => {
            calculator.appendNumber(5);
            calculator.memoryStore();
            calculator.clear();
            calculator.appendNumber(3);
            calculator.memoryAdd();
            calculator.memoryRecall();
            expect(calculator.currentValue).toBe('8');
        });

        test('memory subtract', () => {
            calculator.appendNumber(5);
            calculator.memoryStore();
            calculator.clear();
            calculator.appendNumber(3);
            calculator.memorySubtract();
            calculator.memoryRecall();
            expect(calculator.currentValue).toBe('2');
        });

        test('memory clear', () => {
            calculator.appendNumber(5);
            calculator.memoryStore();
            calculator.memoryClear();
            calculator.memoryRecall();
            expect(calculator.currentValue).toBe('0');
        });
    });

    // Constants Tests
    describe('Mathematical Constants', () => {
        test('PI constant', () => {
            calculator.pi();
            expect(parseFloat(calculator.currentValue)).toBeCloseTo(Math.PI, 10);
        });

        test('E constant', () => {
            calculator.e();
            expect(parseFloat(calculator.currentValue)).toBeCloseTo(Math.E, 10);
        });
    });

    // Display and Format Tests
    describe('Display and Format', () => {
        test('append decimal point', () => {
            calculator.appendNumber(5);
            calculator.appendDecimal();
            calculator.appendNumber(3);
            expect(calculator.currentValue).toBe('5.3');
        });

        test('prevent multiple decimal points', () => {
            calculator.appendNumber(5);
            calculator.appendDecimal();
            calculator.appendDecimal();
            calculator.appendNumber(3);
            expect(calculator.currentValue).toBe('5.3');
        });

        test('display number formatting', () => {
            calculator.appendNumber(1000);
            expect(calculator.getDisplayNumber(calculator.currentValue)).toBe('1,000');
        });

        test('delete last digit', () => {
            calculator.appendNumber(123);
            calculator.delete();
            expect(calculator.currentValue).toBe('12');
        });
    });

    // Error Handling Tests
    describe('Error Handling', () => {
        test('handle empty input for operations', () => {
            calculator.setOperation('+');
            expect(calculator.currentValue).toBe('');
            expect(calculator.operation).toBeNull();
        });

        test('handle invalid calculations', () => {
            calculator.setOperation('+');
            calculator.calculate();
            expect(calculator.currentValue).toBe('');
        });
    });
});
