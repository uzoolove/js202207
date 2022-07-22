const net = require('net');
const fs = require('fs');
const readline = require('readline');
const os = require('os');
const sockets = new Map();

const ws = fs.createWriteStream('chat.txt', {flags: 'a'});
net.createServer(function(socket){
  console.log(socket.remoteAddress, '접속');

  const rl = readline.createInterface({input: socket});

  socket.on('close', function(){
    broadcast('chat', '시스템', socket.nickname + '님이 퇴장했습니다.');
    sockets.delete(socket.nickname);
  });
  
  socket.on('error', function(){
    console.log(socket.remoteAddress, '접속 종료.');
  });

  // 지정한 클라이언트에 메세지 전송
  function sendMsg(socket, page, sender, msg){
    socket.write(JSON.stringify({sender, page, msg}) + os.EOL);
  }

  // 접속한 모든 클라이언트에 메세지 전송
  function broadcast(page, sender, msg){
    for(let target of sockets.values()){
      sendMsg(target, page, sender, msg.trim());
    }
    ws.write(sender + ': ' + msg.trim());
  }

  rl.on('line', data => {
    // {action: 'login', msg: '김철수'}
    // {action: 'msg', msg: '안녕.'}
    data = JSON.parse(data.toString());

    switch(data.action){
      case 'login':
        let nickname = data.msg.trim();
        if(nickname == ''){
          sendMsg(socket, 'login', '시스템', '닉네임을 입력하세요.');
        }else if(sockets.has(nickname)){
          sendMsg(socket, 'login', '시스템', nickname + '은(는) 이미 사용중입니다.');
        }else{
          socket.nickname = nickname;
          sockets.set(nickname, socket);
          sendMsg(socket, 'login', '시스템', 'login success');
          broadcast('chat', '시스템', nickname + '님이 입장했습니다.');
        }
        break;
      case 'msg':
        if(data.msg.trim() != ''){
          broadcast('chat', socket.nickname, data.msg);
        }else{
          socket.count = socket.count || 1;
          socket.count++;
          if(socket.count > 3){
            socket.destroy();
            sockets.delete(socket.nickname);
          }
          sendMsg(socket, 'chat', '시스템', '도배 금지.... 한번만 더 하면 강퇴!!!!!');
        }
        break;
    }
  });

}).listen(1234, function(){
  console.log('TCP 서버 구동.');
});