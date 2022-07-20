const net = require('net');
// var socket = net.createConnection(1234, 'localhost');
var socket = net.createConnection(1234, '192.168.0.24');
socket.on('data', function(msg){
  console.log(msg.toString());
});
process.stdin.pipe(socket);
socket.write('안녕');