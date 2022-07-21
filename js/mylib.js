var ajax = function(url, method, async, data, dataType, success){
  // 1. XMLHttpRequest 생성		
  let xhr = new XMLHttpRequest();
  // 2. 요청준비(open())
  xhr.open(method, url, async);
  if(success){
    xhr.addEventListener('load', function(){
      // 4. 응답 데이터 처리
      let result = xhr.responseText;
      if(dataType.toLowerCase() == 'json'){
        result = JSON.parse(result);
      }    
      success(result);
    });
  }
  // 3. 요청(send())
  xhr.send(data);
}