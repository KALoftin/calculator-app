const input = document.getElementById('calc-input');
const equals = document.getElementById('btn-equal');
const clear = document.getElementById('btn-clear');
let displayValue = '';
let firstNumInput;
let inputOperator = '';
let newOpNums;
let didUserInputNums = false;

input.value = '0';

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
    } else {
      // Add the first input numbers and operator to memory
      if (didUserInputNums) {
        inputOperator = btnID.value;
        firstNumInput = Number(displayValue);
        displayValue = '';
        input.value = displayValue;
        didUserInputNums = false;
        // Update calculation call if first input number is already there
      } else if (firstNumInput || firstNumInput === 0) {
        inputOperator = btnID.value;
        displayValue = '';
        input.value = displayValue;
        // Alerts user to start with a number not an operator
      } else {
        window.alert('Start with a number not operator');
        displayValue = '';
      }
    }
  });
});

equals.addEventListener('click', function () {
  const newInputNums = Number(displayValue);
  const newNum = operate(inputOperator, firstNumInput, newInputNums);
  input.value = newNum;
  firstNumInput = newNum;
  displayValue = '';
  inputOperator = '';
  didUserInputNums = false;
});

clear.addEventListener('click', function () {
  input.value = '0';
  displayValue = '';
  inputOperator = '';
  didUserInputNums = false;
  firstNumInput = NaN;
});
