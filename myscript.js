let displayValue = '';

function numBtnClick() {
  // const btn = document.getElementById('calc-input');
  const btn = (document.getElementById('calc-input').value = 'Hello');
}

function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return x / y;
}

function operate(operator, x, y) {
  console.log(operator(x, y));
}

// operate(add, 5, 10);
// operate(subtract, 10, 5);
// operate(multiply, 10, 5);
// operate(divide, 10, 5);
