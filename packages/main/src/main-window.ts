/* eslint-disable import/no-extraneous-dependencies */
import { join } from "path"
import { URL } from "url"

import { app, BrowserWindow } from "electron"
import electronWindowState from "electron-window-state"

const DefaultWidth = 1_200
const DefaultHeight = 1_000

async function createWindow() {
  // Load the previous state with fallback to defaults
  const mainWindowState = electronWindowState({
    defaultWidth: DefaultWidth,
    defaultHeight: DefaultHeight,
  })

  const { x, y, isFullScreen, width, height } = mainWindowState

  const browserWindow = new BrowserWindow({
    titleBarStyle: "hidden",
    show: false, // Use the 'ready-to-show' event to show the instantiated BrowserWindow.
    x,
    y,
    fullscreen: isFullScreen,
    width,
    height,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false, // Sandbox disabled because the demo of preload script depend on the Node.js api
      webviewTag: false, // The webview tag is not recommended. Consider alternatives like an iframe or Electron's BrowserView. @see https://www.electronjs.org/docs/latest/api/webview-tag#warning
      preload: join(app.getAppPath(), "packages/preload/dist/index.cjs"),
    },
  })

  mainWindowState.manage(browserWindow)

  /**
   * If the 'show' property of the BrowserWindow's constructor is omitted from the initialization options,
   * it then defaults to 'true'. This can cause flickering as the window loads the html content,
   * and it also has show problematic behaviour with the closing of the window.
   * Use `show: false` and listen to the  `ready-to-show` event to show the window.
   *
   * @see https://github.com/electron/electron/issues/25012 for the afford mentioned issue.
   */
  browserWindow.on("ready-to-show", () => {
    browserWindow?.show()
  })

  /**
   * URL for main window.
   * Vite dev server for development.
   * `file://../renderer/index.html` for production and test.
   */
  const pageUrl =
    import.meta.env.DEV && import.meta.env.VITE_DEV_SERVER_URL !== undefined
      ? import.meta.env.VITE_DEV_SERVER_URL
      : new URL("../renderer/dist/index.html", `file://${__dirname}`).toString()

  await browserWindow.loadURL(pageUrl)

  return browserWindow
}

/**
 * Restore an existing BrowserWindow or Create a new BrowserWindow.
 */
export async function restoreOrCreateWindow() {
  let window = BrowserWindow.getAllWindows().find((w) => !w.isDestroyed())

  if (window === undefined) {
    window = await createWindow()
  }

  if (window.isMinimized()) {
    window.restore()
  }

  window.focus()
}
