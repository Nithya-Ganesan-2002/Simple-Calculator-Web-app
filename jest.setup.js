// Set up a basic DOM environment
document.body.innerHTML = `
    <div id="resultArea"></div>
    <div id="opac"></div>
    <div id="calculator">
        <button id="clrTxt">Clear</button>
        <button id="del">Delete</button>
        <button id="eq">=</button>
        <button id="decp">.</button>
        <button id="sin">sin</button>
        <button id="cos">cos</button>
        <button id="tan">tan</button>
        <button id="log">log</button>
        <button id="sqrt">√</button>
        <button id="pow">^</button>
        <button id="pi">π</button>
        <button id="e">e</button>
        <button id="mc">MC</button>
        <button id="mr">MR</button>
        <button id="mplus">M+</button>
        <button id="mminus">M-</button>
    </div>
`;

// Add number buttons
for (let i = 0; i <= 9; i++) {
    const button = document.createElement('button');
    button.id = `num${i}`;
    button.textContent = i;
    document.getElementById('calculator').appendChild(button);
}

// Add operation buttons
const operations = ['+', '-', '*', '/'];
operations.forEach((op, i) => {
    const button = document.createElement('button');
    button.id = `op${i}`;
    button.textContent = op;
    document.getElementById('calculator').appendChild(button);
});

// Add angle mode radio buttons
const angleDiv = document.createElement('div');
['DEG', 'RAD'].forEach(mode => {
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'angle-unit';
    radio.value = mode;
    radio.id = `angle-${mode.toLowerCase()}`;
    angleDiv.appendChild(radio);
});
document.body.appendChild(angleDiv);

// Import Calculator class
const Calculator = require('./calc.js');
global.Calculator = Calculator;
