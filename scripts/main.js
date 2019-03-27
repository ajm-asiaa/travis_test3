const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
var spawn = require('child_process').spawn;
const child_process = require("child_process");
const os = require('os');

const dialog = electron.dialog;

// Disable error dialogs by overriding
dialog.showErrorBox = function(title, content) {
    console.log(`${title}\n${content}`);
};

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Detect user arguments; starting directory and server mode request
 process.argv.forEach((val, index) => {
//   console.log(`${index}: ${val}`)
 })
 const args = process.argv.slice(1);
 var arg1 = String(args[0]);
 var arg2 = String(args[1]);
 var arg3 = String(args[2]);
          
 if (arg1 === 'undefined') {
     arg1 = String();
       } else {
//     console.log("User argument 1:", arg1);
     }
             
 if (arg2 === 'undefined') {
     arg2 = String();
       } else {
//     console.log("User argument 2:", arg2);
     } 
    
 if (arg3 === 'undefined') {
     arg3 = String();
       } else {
//     console.log("User argument 3:", arg3);
     }

 if (arg1 === '--help') {
     console.log("usage: carta ");
     console.log("             [] CARTA file browser will default to $HOME");
     console.log("             [.] CARTA file browser will default to the current directory; $PWD");
     console.log("             [<directory>] CARTA file browser will default to the specified directory; <directory>");
     console.log("             [--help] View this help output");
     app.quit()
     }

function createWindow() {
    // Create the browser window.
    if (process.platform === 'darwin') {
    mainWindow = new BrowserWindow({width: 1920, height: 1080});
}
    if (process.platform === 'linux') {
    mainWindow = new BrowserWindow({width: 1280, height: 720, icon:"carta_logo_v2.png"});
    mainWindow.setMenu(null);
    }

    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        preload: __dirname + '/preload.js',
        slashes: true
    }));

    // Start CARTA
    if (process.platform === 'darwin') {
     const exec = require('child_process').exec;
     exec(path.join(__dirname,'carta-backend/bin/run.sh').concat(' ',arg1,' ',arg2,' ',arg3));
//    console.log(path.join(__dirname,'carta-backend/bin/run.sh').concat(' ',arg1,' ',arg2,' ',arg3));
};

    // Open the DevTools.
//    mainWindow.webContents.openDevTools()


    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
//    if (process.platform == 'darwin') {
        var killall = "/usr/bin/killall";
        var args = ["carta_backend"];
        child_process.spawn(killall, args, {});
        app.quit()
//    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

