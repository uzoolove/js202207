// 선언문 방식의 함수 선언
function add(x, y){
  return x + y;
}
console.log(add(10, 20));
console.log(add.call(this, 30, 40));
console.log(add.apply(this, [50, 60]));