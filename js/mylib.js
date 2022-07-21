// var ajax = function(url, method, async, data, dataType, success){
var ajax = function(url, options){
  options = options || {};
  options.method = options.method || 'get';
  if(options.async == undefined){
    options.async = true;
  }
  options.data = options.data || '';
  options.dataType = options.dataType || 'text';
  if(options.method.toLowerCase() == 'get' && options.data){
    url += '?' + options.data;
    options.data = '';
  }
  // 1. XMLHttpRequest 생성		
  let xhr = new XMLHttpRequest();
  // 2. 요청준비(open())
  xhr.open(options.method, url, options.async);
  if(options.success){
    xhr.addEventListener('load', function(){
      // 4. 응답 데이터 처리
      let result = xhr.responseText;
      if(options.dataType.toLowerCase() == 'json'){
        result = JSON.parse(result);
      }    
      options.success(result);
    });
  }
  // 3. 요청(send())
  xhr.send(options.data);
}