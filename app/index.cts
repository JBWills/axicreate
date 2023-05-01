/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
const path = require("path")

const { app, BrowserWindow } = require("electron")
const windowStateKeeper = require("electron-window-state")

const DefaultWidth = 1_200
const DefaultHeight = 1_000

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit()
}

const isDev = process.env.IS_DEV === "true"
const appTitle = isDev ? "Axicreate Dev" : "Axicreate"

function createWindow() {
  // Load the previous state with fallback to defaults
  const mainWindowState = windowStateKeeper({
    defaultWidth: DefaultWidth,
    defaultHeight: DefaultHeight,
  })

  const { x, y, isFullScreen, width, height } = mainWindowState

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    title: appTitle,
    titleBarStyle: "hidden",
    // don't show the window until ready
    show: false,
    x,
    y,
    fullscreen: isFullScreen,
    width,
    height,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      nodeIntegration: true,
    },
    // TODO: this doesn't work
    icon: "/images/icons/app",
  })

  mainWindowState.manage(mainWindow)

  mainWindow.once("ready-to-show", () => mainWindow.show())

  // Open the DevTools.
  if (isDev) {
    mainWindow.loadURL("http://localhost:3000")
  } else {
    // mainWindow.removeMenu();
    mainWindow.loadFile(path.join(__dirname, "build", "index.html"))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})
