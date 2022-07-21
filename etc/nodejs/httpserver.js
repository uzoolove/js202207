const http = require('http');
http.createServer(function(req, res){
  console.log(req.method, req.url, req.httpVersion);
  console.log(req.headers);

  res.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'});
  res.end('<h1>안녕</h1>');

}).listen(8080, function(){
  console.log('HTTP 서버 구동. http://localhost:8080');
});