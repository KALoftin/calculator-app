const input = document.getElementById('calc-input');
let displayValue = '';

function numBtnClick(id) {
  const btnID = document.getElementById(`${id}`);
  displayValue += btnID.value;
  input.value = displayValue;
}

Array.from(document.getElementsByClassName('num-btns')).forEach(function (e) {
  const elmID = e.getAttribute('id');
  e.addEventListener('click', function () {
    numBtnClick(elmID);
  });
});

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
