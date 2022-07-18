// 지정한 배열의 모든 요소를 출력한다.
function printArr(arr){
  var i;
	for(i=0; i<arr.length; i++){
		console.log(i, arr[i]);
	}
  console.log('');
}

// 지정한 객체의 모든 속성을 출력한다.
function printObj(obj){
  for(var i in obj){
    // TODO: prototype 단원에서 자세히 확인. 배열의 hasOwnProperty() 메소드
    if(obj.hasOwnProperty(i)){
      console.log(i, obj[i]);
    }
  }
}

var arr = ['zero', 'one', 'two'];
arr.push('three');
arr.push('four');
printArr(arr);

arr.pop();
arr.shift();
printArr(arr);

// 일반 객체처럼 속성 추가
arr.name = 'kim';

// 대입연산자로 속성 추가. enumerable, writable true로 지정됨
// arr.age = 30;

// 속성 추가 전용 메소드
Object.defineProperty(arr, 'age', {
  value: 20,
  enumerable: true,   // 열거 가능한지 여부(for-in, Object.keys(), Object.values()... 에 노출여부), 생략시 false
  writable: false,  // 대입연산자로 value 수정이 가능한지 여부(상수형 변수), 생략시 false
});

printObj(arr);
