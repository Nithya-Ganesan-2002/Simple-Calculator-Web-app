var numKeys = [];
var opns = [];
var res = document.querySelector("#resultArea");
var clrBtn = document.querySelector("#clrTxt");
var delBtn = document.querySelector("#del");
var eqBtn = document.querySelector("#eq");
var decPoint = document.querySelector("#decp");
var opnSyms = ["+", "-", "*", "/"];

for(var i=0;i<=9;i++){
	(function(i){
    	qs = "#num" + i;
		numKeys.push(document.querySelector(qs));
		numKeys[i].addEventListener("click", function(){
			res.textContent += i;
		});
  	}(i));
}

for(var i=0;i<=3;i++){
	(function(i){
    	qs = "#op" + i;
		opns.push(document.querySelector(qs));
		opns[i].addEventListener("click", function(){
			res.textContent += opnSyms[i];
		});
  	}(i));
}

clrBtn.addEventListener("click", function(){
	res.textContent = "";
});

delBtn.addEventListener("click", function(){
    res.textContent = res.textContent.substring(0, res.textContent.length - 1);
});

decPoint.addEventListener("click", function(){
	res.textContent += ".";
});

eqBtn.addEventListener("click", function(){
	try{
		res.textContent = eval(res.textContent);
	}
	catch(e){
		res.textContent = "Invalid Syntax";
	}
});
// Calculator state
let state = {
    currentValue: '0',
    previousValue: null,
    operator: null,
    memory: 0,
    isScientificMode: false,
    waitingForSecondOperand: false
};

// Display functions
function updateDisplay() {
    document.getElementById('display').value = state.currentValue;
}

function clearDisplay() {
    state.currentValue = '0';
    state.previousValue = null;
    state.operator = null;
    state.waitingForSecondOperand = false;
    updateDisplay();
}

// Mode switching
function toggleMode() {
    state.isScientificMode = !state.isScientificMode;
    const scientificButtons = document.querySelectorAll('.scientific');
    scientificButtons.forEach(button => {
        button.style.display = state.isScientificMode ? 'inline-block' : 'none';
    });
}

// Basic operations
function inputDigit(digit) {
    if (state.waitingForSecondOperand) {
        state.currentValue = digit;
        state.waitingForSecondOperand = false;
    } else {
        state.currentValue = state.currentValue === '0' ? digit : state.currentValue + digit;
    }
    updateDisplay();
}

function inputDecimal() {
    if (state.waitingForSecondOperand) {
        state.currentValue = '0.';
        state.waitingForSecondOperand = false;
        return;
    }
    if (!state.currentValue.includes('.')) {
        state.currentValue += '.';
    }
    updateDisplay();
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(state.currentValue);

    if (state.previousValue === null) {
        state.previousValue = inputValue;
    } else if (state.operator) {
        const result = performCalculation();
        state.currentValue = String(result);
        state.previousValue = result;
    }

    state.waitingForSecondOperand = true;
    state.operator = nextOperator;
    updateDisplay();
}

function performCalculation() {
    const prev = parseFloat(state.previousValue);
    const current = parseFloat(state.currentValue);

    switch (state.operator) {
        case '+': return prev + current;
        case '-': return prev - current;
        case '*': return prev * current;
        case '/': return prev / current;
        case 'power': return Math.pow(prev, current);
        default: return current;
    }
}

// Scientific operations
function calculateSin() {
    state.currentValue = Math.sin(parseFloat(state.currentValue) * Math.PI / 180).toString();
    updateDisplay();
}

function calculateCos() {
    state.currentValue = Math.cos(parseFloat(state.currentValue) * Math.PI / 180).toString();
    updateDisplay();
}

function calculateTan() {
    state.currentValue = Math.tan(parseFloat(state.currentValue) * Math.PI / 180).toString();
    updateDisplay();
}

function calculateLog() {
    state.currentValue = Math.log10(parseFloat(state.currentValue)).toString();
    updateDisplay();
}

function calculateLn() {
    state.currentValue = Math.log(parseFloat(state.currentValue)).toString();
    updateDisplay();
}

function calculateSqrt() {
    state.currentValue = Math.sqrt(parseFloat(state.currentValue)).toString();
    updateDisplay();
}

function calculatePower() {
    state.previousValue = parseFloat(state.currentValue);
    state.operator = 'power';
    state.waitingForSecondOperand = true;
}

// Memory operations
function memoryClear() {
    state.memory = 0;
}

function memoryRecall() {
    state.currentValue = state.memory.toString();
    updateDisplay();
}

function memoryAdd() {
    state.memory += parseFloat(state.currentValue);
}

function memorySubtract() {
    state.memory -= parseFloat(state.currentValue);
}

function memoryStore() {
    state.memory = parseFloat(state.currentValue);
}

// Event listeners setup
document.addEventListener('DOMContentLoaded', () => {
    // Digit buttons
    document.querySelectorAll('[data-digit]').forEach(button => {
        button.addEventListener('click', (e) => {
            inputDigit(e.target.dataset.digit);
        });
    });

    // Operator buttons
    document.querySelectorAll('[data-operator]').forEach(button => {
        button.addEventListener('click', (e) => {
            handleOperator(e.target.dataset.operator);
        });
    });

    // Scientific operation buttons
    document.querySelectorAll('[data-scientific]').forEach(button => {
        button.addEventListener('click', (e) => {
            const operation = e.target.dataset.scientific;
            switch (operation) {
                case 'sin': calculateSin(); break;
                case 'cos': calculateCos(); break;
                case 'tan': calculateTan(); break;
                case 'log': calculateLog(); break;
                case 'ln': calculateLn(); break;
                case 'sqrt': calculateSqrt(); break;
                case 'power': calculatePower(); break;
            }
        });
    });

    // Memory operation buttons
    document.querySelectorAll('[data-memory]').forEach(button => {
        button.addEventListener('click', (e) => {
            const operation = e.target.dataset.memory;
            switch (operation) {
                case 'mc': memoryClear(); break;
                case 'mr': memoryRecall(); break;
                case 'mplus': memoryAdd(); break;
                case 'mminus': memorySubtract(); break;
                case 'ms': memoryStore(); break;
            }
        });
    });

    // Mode toggle button
    document.getElementById('toggleMode').addEventListener('click', toggleMode);

    // Clear button
    document.getElementById('clear').addEventListener('click', clearDisplay);

    // Decimal button
    document.getElementById('decimal').addEventListener('click', inputDecimal);
});
