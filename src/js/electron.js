const {app, BrowserWindow} = require('electron');

// メインウィンドウ
let mainWindow;

function createWindow() {
    // メインウィンドウを作成
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 800,
        height: 600
    });
    mainWindow.loadFile('index.html');// メインウィンドウを指定
    //mainWindow.webContents.openDevTools();// デベロッパーツール起動
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// 初期化が完了したとき
app.on('ready', createWindow);

// 全てのウィンドウが閉じたとき
app.on('window-all-closed', () => {
    // macOS以外はアプリケーションを終了
    if(process.platform !== 'darwin') {
        app.quit();
    }
});

// アプリケーションがアクティブになったとき
app.on('activate', () => {
    // メインウィンドウが消えていたら再度メインウィンドウを作成
    if(mainWindow === null) {
        createWindow();
    }
});

