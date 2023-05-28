/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable class-methods-use-this */

import { app, BrowserWindow } from "electron"

import { saveSvg } from "./fileInOut/saveSvg"
import { listenToIpcFunction } from "./ipc/listenToIpcFunction"
import { restoreOrCreateWindow } from "./mainWindow"

class Application {
  public init(): void {
    /**
     * Prevent electron from running multiple instances.
     */
    const isSingleInstance = app.requestSingleInstanceLock()
    if (!isSingleInstance) {
      app.quit()
      process.exit(0)
    }
    app.on("second-instance", restoreOrCreateWindow)

    /**
     * @see https://www.electronjs.org/docs/latest/api/app#event-activate-macos Event: 'activate'.
     */
    app.on("activate", restoreOrCreateWindow)

    app
      .whenReady()
      .then(restoreOrCreateWindow)
      .catch((e) => console.error("Failed create window:", e))

    app.on("window-all-closed", Application.onWindowAllClosed)
    app.on("activate", () => this.onActivate())

    app
      .whenReady()
      .then(() => import("electron-devtools-installer"))
      .then(({ default: installExtension, REACT_DEVELOPER_TOOLS }) =>
        installExtension(REACT_DEVELOPER_TOOLS, {
          loadExtensionOptions: {
            allowFileAccess: true,
          },
        })
      )
      .catch((e) => console.error("Failed install extension:", e))

    listenToIpcFunction("save-svg", (filePath, svgString) => saveSvg(filePath, svgString))
  }

  private onActivate(): void {
    if (BrowserWindow.getAllWindows().length === 0) {
      restoreOrCreateWindow()
    }
  }

  private static onWindowAllClosed(): void {
    if (process.platform !== "darwin") {
      app.quit()
    }
  }
}

export const AxicreateApp = new Application()

AxicreateApp.init()
