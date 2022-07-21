const net = require('net');
net.createServer(function(socket){
  socket.on('data', function(msg){
    console.log(msg.toString());
    socket.write('HTTP/1.1 200 OK\n');
    socket.write('Content-Type: text/html;charset=UTF-8\n');
    socket.write('\n');
    socket.end('<h1>안녕</h1>');
  });
}).listen(8080, function(){
  console.log('HTTP 서버 구동. http://localhost:8080');
});