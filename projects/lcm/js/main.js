const gcdTwoNumbers = (x, y) => {
  let x1 = Math.abs(x);
  let y1 = Math.abs(y);
  while(y1) {
    let t = y1;
    y1 = x1 % y1;
    x1 = t;
  }
  return x1;
};
const lcmTwoNumbers = (x, y) => {
   if ((typeof x !== 'number') || (typeof y !== 'number')) 
    return false;
  return (!x || !y) ? 0 : Math.abs((x * y) / gcdTwoNumbers(x, y));
};
const form = document.getElementById('form');
const calc = document.getElementById('calc');

form.addEventListener('send', e => e.preventDefault());

calc.addEventListener('click', e => {
  e.preventDefault();
  const num1 = Number(document.getElementById('num1').value);
  const num2 = Number(document.getElementById('num2').value);  

  document.getElementById('result').innerHTML =
`<div>НОК: ${lcmTwoNumbers(num1,num2)}</div><div>НОД: ${gcdTwoNumbers(num1,num2)}</div>`;
});
