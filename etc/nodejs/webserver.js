var nodeStatic = require('node-static');
var http = require('http');
var path = require('path');
var url = require('url');

var home = path.join(__dirname, '..', '..');
var file = new nodeStatic.Server(home);
http.createServer(function (req, res) {	
  res.setHeader('Access-Control-Allow-Origin', '*');
  // http://localhost:8080/hello.html?name=kim&age=30
  // https://www.chosun.com/national/regional/yeongnam/2022/07/20/4WWYSZCJHZEMVHYLOP3SVVKDUA/?utm_source=naver&utm_medium=newsstand&utm_campaign=news
  let parseUrl = url.parse(req.url, true);
  switch(parseUrl.pathname){
    case '/time':
      // http://localhost/time?msg=hello
      responseTime(req, res);
      break;
    case '/timejson':
      // http://localhost/timejson?msg=안녕
      responseTimeJson(req, res);
      break;
    default:
      file.serve(req, res);
  }
}).listen(80, function(){
	console.log('http://localhost');
});

// 서버의 현재 시간을 응답
function responseTime(req, res){
	getQuery(req, function(err, query){
    var now = Date();
    res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'});
    // 추출한 query string과 함께 현재 시간을 문자열로 응답
    // setTimeout(function(){
      res.end(query.msg + ' ' + now); 
    // }, 1000*10);    
  });
}

// 서버의 현재 시간을 응답(JSON)
function responseTimeJson(req, res){
	getQuery(req, function(err, query){
    var now = Date();
    res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
    // 추출한 query string과 함께 현재 시간을 JSON 형태의 문자열로 응답
    var result = {
      time: now,
      msg: query.msg
    };
    res.end(JSON.stringify(result));
  });
}

// 쿼리스트링 추출
var body = require('body/form');
function getQuery(req, cb){
	if(req.method == 'GET'){
    var parseUrl = url.parse(req.url, true);
    cb(null, parseUrl.query);
	}else if(req.method == 'POST'){
		body(req, cb);
	}
}