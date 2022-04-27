const input = document.getElementById('calc-input');
const equals = document.getElementById('btn-equal');
let displayValue = '';
let firstNumInput;
let inputOperator = '';
let newOpNums;

function operate(operator, x, y) {
  if (operator === '/') return x / y;
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
  });
});

// Similar to function above, but adds the operator the user enters
Array.from(document.getElementsByClassName('oper-btns')).forEach(function (e) {
  const elmID = e.getAttribute('id');
  e.addEventListener('click', function () {
    const btnID = document.getElementById(`${elmID}`);
    if (inputOperator) {
      const newInputNums = Number(displayValue);
      firstNumInput = operate(inputOperator, firstNumInput, newInputNums);
      displayValue = '';
      input.value = firstNumInput;
      inputOperator = btnID.value;
    } else {
      inputOperator = btnID.value;
      firstNumInput = Number(displayValue);
      displayValue = '';
      input.value = displayValue;
    }
  });
});

equals.addEventListener('click', function () {
  const newInputNums = Number(displayValue);
  displayValue = operate(inputOperator, firstNumInput, newInputNums);
  input.value = displayValue;
});
