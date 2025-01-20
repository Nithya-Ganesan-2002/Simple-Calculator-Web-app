// Mock DOM elements
document.body.innerHTML = `
    <div id="resultArea"></div>
    <div id="opac"></div>
`;

// Make Calculator class available globally
const fs = require('fs');
const path = require('path');
const calculatorCode = fs.readFileSync(path.join(__dirname, 'calc.js'), 'utf8');
eval(calculatorCode);