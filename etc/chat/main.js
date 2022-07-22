const { app, BrowserWindow, ipcMain, dialog } = require('electron')

const path = require('path')
const net = require('net');
const os = require('os');
const readline = require('readline');
const settings = require('./settings');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // win.webContents.openDevTools();

  // renderer 프로세서 -> main 프로세서
  ipcMain.on('login', (event, nickname) => {
    let socket = net.createConnection(settings.server.port, settings.server.ip, () => {
      socket.write(JSON.stringify({action: 'login', msg: nickname}) + os.EOL);
    });

    const rl = readline.createInterface({input: socket});

    rl.on('line', data => {
      data = JSON.parse(data.toString());
      switch(data.page){
        case 'login':
          if(data.msg == 'login success'){
            win.loadFile('chat.html');
          }else{
            win.webContents.send('loginMsg', data);
          }
          break;
        case 'chat':
          win.webContents.send('chatMsg', data);
          break;
      }
    });

    socket.on('close', () => {
      dialog.showErrorBox('에러', '서버와의 연결이 끊겼습니다.');
      win.loadFile('index.html');
    });

    socket.on('error', () => {});

    ipcMain.on('sendMsg', (event, msg) => {
      socket.write(JSON.stringify({action: 'msg', msg}) + os.EOL);
    });

  });

  



  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
