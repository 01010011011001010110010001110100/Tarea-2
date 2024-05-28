

//Variables
var historyDisplay = "";
var lastCalculationResult = 0;
var calculationResult = 0;
var numberEntered = 0;
var currentOperation = '';
var isDisplayShowingResult = true;
var isResultGetted = false;

//Elements
var historyDisplayElement = document.getElementById("display-history");
var resultDisplayElement = document.getElementById("display-result");
var resultHistoryElement = document.getElementById("results-body");

//Start
showResultHistory();

function sum() {
    setNumberEntered();
    currentOperation = '+';
    lastCalculationResult = calculationResult;
    if (!isDisplayShowingResult || isResultGetted) calculationResult += numberEntered;
    setHistoryDisplay();
    resultDisplayElement.textContent = calculationResult;
    isDisplayShowingResult = true;
    isResultGetted = false;
}

function subtract() {
    setNumberEntered();
    currentOperation = '-';
    lastCalculationResult = calculationResult;
    if (!isDisplayShowingResult || isResultGetted) calculationResult -= numberEntered;
    setHistoryDisplay();
    resultDisplayElement.textContent = calculationResult;
    isDisplayShowingResult = true;
    isResultGetted = false;
}

function multiply() {
    setNumberEntered();
    currentOperation = '*';
    lastCalculationResult = calculationResult;
    if (!isDisplayShowingResult || isResultGetted) {
        calculationResult = calculationResult == 0 ? 
        numberEntered
        : calculationResult * numberEntered;
    }
    setHistoryDisplay();
    resultDisplayElement.textContent = calculationResult;
    isDisplayShowingResult = true;
    isResultGetted = false;
}

function divide() {
    setNumberEntered();
    currentOperation = '/';
    lastCalculationResult = calculationResult;
    if (!isDisplayShowingResult || isResultGetted) {
        calculationResult = calculationResult == 0 ?
        numberEntered
        : calculationResult / numberEntered;
    }
    setHistoryDisplay();
    resultDisplayElement.textContent = calculationResult;
    isDisplayShowingResult = true;
    isResultGetted = false;
}

function setNumberEntered() {
    if (!isDisplayShowingResult)
        numberEntered = Number(resultDisplayElement.textContent);
}

function getResult(){
    isResultGetted = true;
    switch (currentOperation) {
        case '+': sum(); break;
        case '-': subtract(); break;
        case '*': multiply(); break;
        case '/': divide(); break;
    }
    saveResultHistory(historyDisplay);
    showResultHistory();
}

function setHistoryDisplay() {
    historyDisplayElement.textContent = 
    isResultGetted ?
    `${lastCalculationResult} ${currentOperation} ${numberEntered} =`
    : `${calculationResult} ${currentOperation}`;

    historyDisplay = `${historyDisplayElement.textContent} ${calculationResult}`;
}

function resetValues() {
    //Variables
    historyDisplay = "";
    lastCalculationResult = 0;
    calculationResult = 0;
    numberEntered = 0;
    currentOperation = '';
    isDisplayShowingResult = true;
    isResultGetted = false;

    //Elements
    resultDisplayElement.textContent = "0";
    historyDisplayElement.textContent = "";
}

function addNumber(number) {
    if (isDisplayShowingResult) {
        clearResultDisplay();
        isDisplayShowingResult = false;
    }
    resultDisplayElement.textContent += number.toString();
}

function removeNumber() {
    var currentNumber = resultDisplayElement.textContent;
    var newNumber = currentNumber.substring(0,currentNumber.length-1);

    if (newNumber.length == 0) {
        resultDisplayElement.textContent = "0";
        isDisplayShowingResult = true;
    }
    else {
        resultDisplayElement.textContent = currentNumber.substring(0,currentNumber.length-1);
    }
}

function clearResultDisplay() {
    resultDisplayElement.textContent = "";
}

function saveResultHistory(result) {
    const results = JSON.parse(localStorage.getItem('results') || '[]');
    results.push(result);
    localStorage.setItem('results', JSON.stringify(results));
}

function showResultHistory() {
    const results = JSON.parse(localStorage.getItem('results') || '[]');
    resultHistoryElement.innerHTML = results.length ? results.join('<br>') : "There is not results.";
}

function clearResultHistory(){
    localStorage.clear();
    showResultHistory();
}