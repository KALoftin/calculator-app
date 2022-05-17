const input = document.getElementById('calc-input');
const equals = document.getElementById('btn-equal');
const clear = document.getElementById('btn-clear');
const decimal = document.getElementById('btn-dec');
let displayValue = '';
let firstNumInput = 0;
let inputOperator = '';
let newOpNums;
let didUserInputNums = false;

input.value = '0';

function clearAll() {
  displayValue = '';
  firstNumInput = 0;
  inputOperator = '';
  didUserInputNums = false;
  decimal.disabled = false;
  input.value = '0';
}

function operate(operator, x, y) {
  if (operator === '/') {
    if (y === 0) {
      didUserInputNums = false;
      window.alert('Error: No division by 0');
      return '0';
    } else {
      return x / y;
    }
  }
  if (operator === '*') return x * y;
  if (operator === '-') return x - y;
  if (operator === '+') return x + y;
}

decimal.addEventListener('click', function () {
  // Once dec button is clicked, check if there's already a
  // decimal displayed. If not then add the decimal, if there
  // is, do nothing
  displayValue += decimal.value;
  input.value = displayValue;
  decimal.disabled = true;
});

// Creates an array from the number buttons in the DOM
// and adds an event listener to each
Array.from(document.getElementsByClassName('num-btns')).forEach(function (e) {
  const elmID = e.getAttribute('id');
  e.addEventListener('click', function () {
    // Event stores the number button value in the variable displayValue
    // and displays the value in the browser
    const btnID = document.getElementById(`${elmID}`);
    displayValue += btnID.value;
    input.value = displayValue;
    didUserInputNums = true;
  });
});

// Similar to function above, but adds the operator the user enters
Array.from(document.getElementsByClassName('oper-btns')).forEach(function (e) {
  const elmID = e.getAttribute('id');
  e.addEventListener('click', function () {
    const btnID = document.getElementById(`${elmID}`);
    // Calculate if user inputs 2 numbers and an operator
    if (didUserInputNums && inputOperator) {
      const newInputNums = Number(displayValue);
      firstNumInput = operate(inputOperator, firstNumInput, newInputNums);
      displayValue = '';
      input.value = firstNumInput;
      inputOperator = btnID.value;
      decimal.disabled = false;
    } else {
      // Add the first input numbers and operator to memory
      if (didUserInputNums) {
        inputOperator = btnID.value;
        firstNumInput = Number(displayValue);
        displayValue = '';
        input.value = firstNumInput;
        decimal.disabled = false;
        didUserInputNums = false;
        // Update calculation call if first input number is already there
      } else if (firstNumInput || firstNumInput === 0) {
        inputOperator = btnID.value;
        displayValue = '';
        decimal.disabled = false;
        input.value = firstNumInput;
        // Alerts user to start with a number not an operator
      } else {
        window.alert('Start with a number not operator');
        clearAll();
      }
    }
  });
});

equals.addEventListener('click', function () {
  if (didUserInputNums && inputOperator === '') {
    displayValue = '';
    decimal.disabled = false;
  } else if (!didUserInputNums) {
    const newNum = operate(inputOperator, firstNumInput, Number(input.value));
    input.value = newNum;
    displayValue = '';
    decimal.disabled = false;
  } else {
    const newInputNums = Number(displayValue);
    const newNum = operate(inputOperator, firstNumInput, newInputNums);
    input.value = newNum;
    firstNumInput = newNum;
    displayValue = '';
    inputOperator = '';
    didUserInputNums = false;
    decimal.disabled = false;
  }
});

clear.addEventListener('click', clearAll);
