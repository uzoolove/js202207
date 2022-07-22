const { contextBridge, ipcRenderer } = require('electron');

// renderer 프로세서에서 main 프로세서로 메세지 전송
contextBridge.exposeInMainWorld('chatAPI', {
  login: nickname => ipcRenderer.send('login', nickname),
  sendMsg: msg => ipcRenderer.send('sendMsg', msg)
});

// main 프로세서 -> renderer 프로세서
ipcRenderer.on('loginMsg', (event, data) => {
  let msgDiv = document.querySelector('#msg');
  msgDiv.innerHTML = data.sender + ': ' + data.msg;
});
ipcRenderer.on('chatMsg', (event, data) => {
  let msgout = document.querySelector('#msgout');
  msgout.value += data.sender + ': ' + data.msg + '\n';
  msgout.scrollTop = msgout.scrollHeight;
});