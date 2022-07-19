function fn(n1, n2){
  console.log(n1, n2);

  // 모든 인자값의 합계를 출력
  var sum = 0;
  for(var i=0; i<arguments.length; i++){
    sum += arguments[i];
  }
  console.log('합계', sum);
}

fn();
fn(10);
fn(20, 30);
fn(40, 50, 60);
fn(2324,345,456,65,578,6767,456,35,42,455,7,578,78,9,78,664,5,435,34,57,57,8);