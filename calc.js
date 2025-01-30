var numKeys = [];
var opns = [];
var res = document.querySelector("#resultArea");
var clrBtn = document.querySelector("#clrTxt");
var delBtn = document.querySelector("#del");
var eqBtn = document.querySelector("#eq");
var decPoint = document.querySelector("#decp");
var opac = document.querySelector("#opac");
var opnSyms = ["+", "-", "*", "/"];

// Memory operations
var memory = 0;
var memClear = document.querySelector("#memClear");
var memRecall = document.querySelector("#memRecall");
var memAdd = document.querySelector("#memAdd");
var memSub = document.querySelector("#memSub");

// Scientific calculator buttons
var sinBtn = document.querySelector("#sin");
var cosBtn = document.querySelector("#cos");
var tanBtn = document.querySelector("#tan");
var piBtn = document.querySelector("#pi");
var squareBtn = document.querySelector("#square");
var cubeBtn = document.querySelector("#cube");
var powerBtn = document.querySelector("#power");
var eBtn = document.querySelector("#e");
var lnBtn = document.querySelector("#ln");
var logBtn = document.querySelector("#log");
var leftParenBtn = document.querySelector("#leftParen");
var rightParenBtn = document.querySelector("#rightParen");

// Constants
const PI = Math.PI;
const E = Math.E;
var symList;
var tmpCal;
var j;
var duplicate;
for(var i=0;i<=9;i++){
	(function(i){
    	qs = "#num" + i;
		numKeys.push(document.querySelector(qs));
		numKeys[i].addEventListener("click", function(){
			res.textContent += i;
			if(opnSyms.length>=1){
				opac.innerHTML=eval(res.textContent);
			}
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
	opac.innerHTML="";
});

delBtn.addEventListener("click", function(){
	temp=res.textContent[res.textContent.length-1];
    res.textContent = res.textContent.substring(0, res.textContent.length - 1);
	if((temp!="+") && temp!="-" && temp!="*" && temp!="/"){
	 duplicate=res.textContent.substring(0,res.textContent.length - 1);
	if(res.textContent[res.textContent.length-1]!="+" && res.textContent[res.textContent.length-1]!="-" && res.textContent[res.textContent.length-1]!="*" && res.textContent[res.textContent.length-1]!="/"){
	    opac.innerHTML=eval(res.textContent);
	}
	else{
		duplicate=res.textContent.substring(0,res.textContent.length - 1);
		opac.innerHTML=eval(duplicate);
	}
}
});


decPoint.addEventListener("click", function(){
	res.textContent += ".";
});

// Memory Operations
memClear.addEventListener("click", function() {
    memory = 0;
});

memRecall.addEventListener("click", function() {
    res.textContent += memory;
});

memAdd.addEventListener("click", function() {
    try {
        memory += parseFloat(eval(res.textContent));
    } catch(e) {
        res.textContent = "Invalid Syntax";
    }
});

memSub.addEventListener("click", function() {
    try {
        memory -= parseFloat(eval(res.textContent));
    } catch(e) {
        res.textContent = "Invalid Syntax";
    }
});

// Scientific Operations
sinBtn.addEventListener("click", function() {
    try {
        let value = eval(res.textContent);
        res.textContent = Math.sin(value * Math.PI / 180).toFixed(8);
    } catch(e) {
        res.textContent = "Invalid Syntax";
    }
});

cosBtn.addEventListener("click", function() {
    try {
        let value = eval(res.textContent);
        res.textContent = Math.cos(value * Math.PI / 180).toFixed(8);
    } catch(e) {
        res.textContent = "Invalid Syntax";
    }
});

tanBtn.addEventListener("click", function() {
    try {
        let value = eval(res.textContent);
        res.textContent = Math.tan(value * Math.PI / 180).toFixed(8);
    } catch(e) {
        res.textContent = "Invalid Syntax";
    }
});

piBtn.addEventListener("click", function() {
    res.textContent += PI;
});

squareBtn.addEventListener("click", function() {
    try {
        let value = eval(res.textContent);
        res.textContent = Math.pow(value, 2);
    } catch(e) {
        res.textContent = "Invalid Syntax";
    }
});

cubeBtn.addEventListener("click", function() {
    try {
        let value = eval(res.textContent);
        res.textContent = Math.pow(value, 3);
    } catch(e) {
        res.textContent = "Invalid Syntax";
    }
});

powerBtn.addEventListener("click", function() {
    res.textContent += "**";
});

eBtn.addEventListener("click", function() {
    res.textContent += E;
});

lnBtn.addEventListener("click", function() {
    try {
        let value = eval(res.textContent);
        if (value <= 0) {
            res.textContent = "Invalid Input";
            return;
        }
        res.textContent = Math.log(value);
    } catch(e) {
        res.textContent = "Invalid Syntax";
    }
});

logBtn.addEventListener("click", function() {
    try {
        let value = eval(res.textContent);
        if (value <= 0) {
            res.textContent = "Invalid Input";
            return;
        }
        res.textContent = Math.log10(value);
    } catch(e) {
        res.textContent = "Invalid Syntax";
    }
});

leftParenBtn.addEventListener("click", function() {
    res.textContent += "(";
});

rightParenBtn.addEventListener("click", function() {
    res.textContent += ")";
});

eqBtn.addEventListener("click", function(){
    try {
        let expression = res.textContent;
        // Replace any standalone 'e' with Math.E and 'pi' with Math.PI
        expression = expression.replace(/\b(e)\b/g, Math.E.toString());
        expression = expression.replace(/\b(pi)\b/g, Math.PI.toString());
        res.textContent = eval(expression);
    } catch(e) {
        res.textContent = "Invalid Syntax";
    }
});
