/* eslint-disable import/no-extraneous-dependencies */
import path from "path"

import { BrowserWindow } from "electron"
import * as electronWindowState from "electron-window-state"

const DefaultWidth = 1_200
const DefaultHeight = 1_000

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

export async function getOrCreateWindow(): Promise<BrowserWindow> {
  let window = BrowserWindow.getAllWindows().find((w) => !w.isDestroyed())

  if (window === undefined) {
    window = await createMainWindow()
  }
  return window
}

export async function restoreOrCreateWindow() {
  const window = await getOrCreateWindow()
  if (window.isMinimized()) {
    window.restore()
  }

  window.focus()
}

export async function createMainWindow() {
  // Load the previous state with fallback to defaults
  const mainWindowState = electronWindowState.default({
    defaultWidth: DefaultWidth,
    defaultHeight: DefaultHeight,
  })

  const { x, y, isFullScreen, width, height } = mainWindowState

  const mainWindow: BrowserWindow = new BrowserWindow({
    titleBarStyle: "hidden",
    show: false, // Use the 'ready-to-show' event to show the instantiated BrowserWindow.
    x,
    y,
    fullscreen: isFullScreen,
    width,
    height,
    icon: path.join(__dirname, "images/icon.icns"),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webviewTag: false,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  })

  mainWindowState.manage(mainWindow)

  mainWindow.once("ready-to-show", () => {
    mainWindow.show()
  })

  await mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  return mainWindow
}
