const net = require('net');
const fs = require('fs');
const sockets = new Map();

// 접속한 모든 클라이언트에 메세지 전송
function broadcast(msg){
  for(let target of sockets.values()){
    target.write(msg);
  }
  ws.write(msg);
}

const ws = fs.createWriteStream('chat.txt', {flags: 'a'});
net.createServer(function(socket){
  console.log(socket.remoteAddress, '접속');
  socket.write('login "닉네임"을 입력하세요.');
  
  socket.on('error', function(){
    console.log(socket.remoteAddress, '접속 종료.');
    broadcast("시스템: " + socket.nickname + "님이 퇴장했습니다.");
    sockets.delete(socket.nickname);
  });
  socket.on('data', function(msg){
    // console.log(socket.remoteAddress, msg.toString());
    if(msg.toString().trim() != ''){
      if(msg.toString().startsWith('login ')){
        socket.nickname = msg.toString().substring(6).trim();
        if(sockets.has(socket.nickname)){
          socket.write(socket.nickname + '는(은) 이미 사용중입니다.');
        }else{
          sockets.set(socket.nickname, socket);
          broadcast("시스템: " + socket.nickname + "님이 입장했습니다.");
        }        
      }else{
        if(socket.nickname){
          broadcast(socket.nickname + ": " + msg);
        }else{
          socket.write('login "닉네임"을 입력하세요.');
        }
      }      
    }else{
      socket.count = socket.count || 1;
      socket.count++;
      if(socket.count > 3){
        socket.destroy();
      }
      socket.write('도배 금지.... 한번만 더 하면 강퇴!!!!!');
    }    
    
  });
  socket.write('환영합니다.');
}).listen(1234, function(){
  console.log('TCP 서버 구동.');
});