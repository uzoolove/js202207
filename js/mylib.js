var MyLib = {};

// 배열의 최소값을 반환한다.
// var a = new Array(20, 10, 30);
// a.min(); -> 10
Array.prototype.min = function(){
  return Math.min(...this);
};

MyLib.get = function(url, data, success){
  var options = {};
  if(typeof data == 'string'){
    options.data = data;
    options.success = success;
  }else{
    options.success = data;
  }
  MyLib.ajax(url, options);
};

// var ajax = function(url, method, async, data, dataType, success){
MyLib.ajax = function(url, options){
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