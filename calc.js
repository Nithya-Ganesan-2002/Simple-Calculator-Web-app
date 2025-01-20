// Calculator class for handling mathematical operations
class Calculator {
    constructor() {
        this.currentValue = '';
        this.previousValue = '';
        this.operation = null;
        this.shouldResetScreen = false;
        this.memory = 0;
        this.angleMode = 'DEG'; // Default to degrees
    }

    appendNumber(number) {
        if (this.shouldResetScreen) {
            this.currentValue = '';
            this.shouldResetScreen = false;
        }
        this.currentValue = this.currentValue.toString() + number.toString();
    }

    appendDecimal() {
        if (this.shouldResetScreen) {
            this.currentValue = '0';
            this.shouldResetScreen = false;
        }
        if (this.currentValue.includes('.')) return;
        this.currentValue = this.currentValue + '.';
    }

    setOperation(operation) {
        if (this.currentValue === '') return;
        if (this.previousValue !== '') {
            this.calculate();
        }
        this.operation = operation;
        this.previousValue = this.currentValue;
        this.currentValue = '';
    }

    calculate() {
        let computation;
        const prev = parseFloat(this.previousValue);
        const current = parseFloat(this.currentValue);
        
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                if (current === 0) {
                    this.currentValue = 'Error';
                    return;
                }
                computation = prev / current;
                break;
            case '^':
                computation = this.power(prev, current);
                break;
            default:
                return;
        }

        this.currentValue = computation.toString();
        this.operation = null;
        this.previousValue = '';
        this.shouldResetScreen = true;
    }

    clear() {
        this.currentValue = '';
        this.previousValue = '';
        this.operation = null;
    }

    delete() {
        this.currentValue = this.currentValue.toString().slice(0, -1);
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    // Scientific Functions
    sin(value) {
        const angle = this.angleMode === 'DEG' ? (value * Math.PI / 180) : value;
        return Math.sin(angle);
    }

    cos(value) {
        const angle = this.angleMode === 'DEG' ? (value * Math.PI / 180) : value;
        return Math.cos(angle);
    }

    tan(value) {
        const angle = this.angleMode === 'DEG' ? (value * Math.PI / 180) : value;
        return Math.tan(angle);
    }

    log(value) {
        if (value <= 0) {
            return 'Error';
        }
        return Math.log10(value);
    }

    sqrt(value) {
        if (value < 0) {
            return 'Error';
        }
        return Math.sqrt(value);
    }

    power(base, exponent) {
        return Math.pow(base, exponent);
    }

    // Memory Functions
    memoryStore() {
        this.memory = parseFloat(this.currentValue) || 0;
    }

    memoryRecall() {
        this.currentValue = this.memory.toString();
        this.shouldResetScreen = true;
    }

    memoryAdd() {
        this.memory += parseFloat(this.currentValue) || 0;
    }

    memorySubtract() {
        this.memory -= parseFloat(this.currentValue) || 0;
    }

    memoryClear() {
        this.memory = 0;
    }

    // Constants
    pi() {
        this.currentValue = Math.PI.toString();
        this.shouldResetScreen = true;
    }

    e() {
        this.currentValue = Math.E.toString();
        this.shouldResetScreen = true;
    }

    setAngleMode(mode) {
        this.angleMode = mode;
    }
}

// Only initialize UI elements if we're in a browser environment
if (typeof document !== 'undefined') {
    // Initialize calculator and UI elements
    const calculator = new Calculator();
    const numKeys = [];
    const opns = [];
    const res = document.querySelector("#resultArea");
    const clrBtn = document.querySelector("#clrTxt");
    const delBtn = document.querySelector("#del");
    const eqBtn = document.querySelector("#eq");
    const decPoint = document.querySelector("#decp");
    const opac = document.querySelector("#opac");
    const opnSyms = ["+", "-", "*", "/"];

    // Scientific function buttons
    const sinBtn = document.querySelector("#sin");
    const cosBtn = document.querySelector("#cos");
    const tanBtn = document.querySelector("#tan");
    const logBtn = document.querySelector("#log");
    const sqrtBtn = document.querySelector("#sqrt");
    const powBtn = document.querySelector("#pow");
    const piBtn = document.querySelector("#pi");
    const eBtn = document.querySelector("#e");

    // Memory function buttons
    const mcBtn = document.querySelector("#mc");
    const mrBtn = document.querySelector("#mr");
    const mplusBtn = document.querySelector("#mplus");
    const mminusBtn = document.querySelector("#mminus");

    // Angle mode selector
    const angleSelector = document.getElementsByName("angle-unit");

    // Initialize number buttons
    for (let i = 0; i <= 9; i++) {
        const qs = "#num" + i;
        numKeys.push(document.querySelector(qs));
        numKeys[i].addEventListener("click", () => {
            calculator.appendNumber(i);
            res.textContent = calculator.currentValue;
            if (calculator.previousValue !== '') {
                opac.innerHTML = calculator.previousValue + ' ' + calculator.operation + ' ' + calculator.currentValue;
            }
        });
    }

    // Initialize operation buttons
    for (let i = 0; i <= 3; i++) {
        const qs = "#op" + i;
        opns.push(document.querySelector(qs));
        opns[i].addEventListener("click", () => {
            calculator.setOperation(opnSyms[i]);
            opac.innerHTML = calculator.previousValue + ' ' + calculator.operation;
            res.textContent = '';
        });
    }

    // Clear button
    clrBtn.addEventListener("click", () => {
        calculator.clear();
        res.textContent = "";
        opac.innerHTML = "";
    });

    // Delete button
    delBtn.addEventListener("click", () => {
        calculator.delete();
        res.textContent = calculator.currentValue;
        if (calculator.currentValue !== '') {
            opac.innerHTML = calculator.previousValue + ' ' + calculator.operation + ' ' + calculator.currentValue;
        } else {
            opac.innerHTML = calculator.previousValue + ' ' + calculator.operation;
        }
    });

    // Decimal point button
    decPoint.addEventListener("click", () => {
        calculator.appendDecimal();
        res.textContent = calculator.currentValue;
    });

    // Equals button
    eqBtn.addEventListener("click", () => {
        if (calculator.currentValue === '' || calculator.previousValue === '') return;
        calculator.calculate();
        res.textContent = calculator.getDisplayNumber(calculator.currentValue);
        opac.innerHTML = '';
    });

    // Scientific function event listeners
    sinBtn.addEventListener("click", () => {
        if (calculator.currentValue === '') return;
        const value = parseFloat(calculator.currentValue);
        calculator.currentValue = calculator.sin(value).toString();
        res.textContent = calculator.getDisplayNumber(calculator.currentValue);
        calculator.shouldResetScreen = true;
    });

    cosBtn.addEventListener("click", () => {
        if (calculator.currentValue === '') return;
        const value = parseFloat(calculator.currentValue);
        calculator.currentValue = calculator.cos(value).toString();
        res.textContent = calculator.getDisplayNumber(calculator.currentValue);
        calculator.shouldResetScreen = true;
    });

    tanBtn.addEventListener("click", () => {
        if (calculator.currentValue === '') return;
        const value = parseFloat(calculator.currentValue);
        calculator.currentValue = calculator.tan(value).toString();
        res.textContent = calculator.getDisplayNumber(calculator.currentValue);
        calculator.shouldResetScreen = true;
    });

    logBtn.addEventListener("click", () => {
        if (calculator.currentValue === '') return;
        const value = parseFloat(calculator.currentValue);
        calculator.currentValue = calculator.log(value).toString();
        res.textContent = calculator.getDisplayNumber(calculator.currentValue);
        calculator.shouldResetScreen = true;
    });

    sqrtBtn.addEventListener("click", () => {
        if (calculator.currentValue === '') return;
        const value = parseFloat(calculator.currentValue);
        calculator.currentValue = calculator.sqrt(value).toString();
        res.textContent = calculator.getDisplayNumber(calculator.currentValue);
        calculator.shouldResetScreen = true;
    });

    powBtn.addEventListener("click", () => {
        if (calculator.currentValue === '') return;
        calculator.setOperation('^');
        calculator.previousValue = calculator.currentValue;
        calculator.currentValue = '';
        opac.innerHTML = calculator.previousValue + ' ^';
    });

    piBtn.addEventListener("click", () => {
        calculator.pi();
        res.textContent = calculator.getDisplayNumber(calculator.currentValue);
    });

    eBtn.addEventListener("click", () => {
        calculator.e();
        res.textContent = calculator.getDisplayNumber(calculator.currentValue);
    });

    // Memory function event listeners
    mcBtn.addEventListener("click", () => {
        calculator.memoryClear();
    });

    mrBtn.addEventListener("click", () => {
        calculator.memoryRecall();
        res.textContent = calculator.getDisplayNumber(calculator.currentValue);
    });

    mplusBtn.addEventListener("click", () => {
        calculator.memoryAdd();
    });

    mminusBtn.addEventListener("click", () => {
        calculator.memorySubtract();
    });

    // Angle mode event listener
    angleSelector.forEach(radio => {
        radio.addEventListener("change", (e) => {
            calculator.setAngleMode(e.target.value);
        });
    });
}

// Export Calculator class for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Calculator;
}
