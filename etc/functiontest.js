// TODO: hoisting 단원. 함수 선언보다 호출을 먼저 할 수 있다.
add();

// 10 + 100의 결과를 출력한다.
function add(){
  var n1 = 10;
  var n2 = 100;
  var result = n1 + n2;
  console.log(n1 + ' + ' + n2 + ' = ' + result);
}
add();
// 전달받은 숫자와 100의 합계를 출력한다.
function add100(n1){
  var n2 = 100;
  var result = n1 + n2;
  console.log(n1 + ' + ' + n2 + ' = ' + result);
}
add100(20); // 120
add100(30); // 130
// 전달받은 두 수의 합계를 출력한다.
function sum(n1, n2){
  var result = n1 + n2;
  console.log(n1 + ' + ' + n2 + ' = ' + result);
}
sum(40, 50);  // 90
sum(60, 70);  // 130
// 전달받은 두 수의 합계를 반환한다.
function sum2(n1, n2){
  var result = n1 + n2;
  return (n1 + ' + ' + n2 + ' = ' + result);
}
var result = sum2(70, 80);
console.log(result);  // 150
console.log(sum2(80, 90));  // 170