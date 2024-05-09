const { app, BrowserWindow } = require('electron');
const { spawn } = require('child_process');
const path = require('path');

let mainWindow;
let reactDevServer;
let flaskServer;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL('http://localhost:5173'); // Assuming React development server runs on port 5173

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', () => {
  createWindow();

  // Start React development server
  reactDevServer = spawn('npm', ['run', 'dev'], {
    cwd: path.join(__dirname, 'client'),
    shell: true,
  });

  reactDevServer.stdout.on('data', (data) => {
    console.log(`React Dev Server: ${data}`);
  });

  reactDevServer.stderr.on('data', (data) => {
    console.error(`React Dev Server Error: ${data}`);
  });

  reactDevServer.on('close', (code) => {
    console.log(`React Dev Server exited with code ${code}`);
  });

  // Start Flask server
  flaskServer = spawn('python', ['app.py'], {
    cwd: path.join(__dirname, 'server'),
    shell: true,
  });

  flaskServer.stdout.on('data', (data) => {
    console.log(`Flask Server: ${data}`);
  });

  flaskServer.stderr.on('data', (data) => {
    console.error(`Flask Server Error: ${data}`);
  });

  flaskServer.on('close', (code) => {
    console.log(`Flask Server exited with code ${code}`);
  });
});

app.on('before-quit', () => {
  // Terminate child processes on app quit
  if (reactDevServer) {
    reactDevServer.kill();
  }
  if (flaskServer) {
    flaskServer.kill();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
