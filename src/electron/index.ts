/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable class-methods-use-this */

import { app, BrowserWindow } from "electron"

import { IpcFunction, IpcFunctions } from "src/shared/types/IpcFunctions"
import { objectKeys } from "src/shared/util/objectKeys"

import { saveSvg } from "./fileInOut/saveSvg"
import { listenToIpcFunction } from "./ipc/listenToIpcFunction"
import { restoreOrCreateWindow } from "./mainWindow"
import { openFile } from "./util/openFile"

const IpcFunctionHandlers = {
  "open-file": (file) => openFile(file),
  "save-svg": (filePath, svgString) => saveSvg(filePath, svgString),
} satisfies {
  [k in keyof IpcFunctions]: IpcFunction<k>
}

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

    for (const key of objectKeys(IpcFunctionHandlers)) {
      const value = IpcFunctionHandlers[key]
      listenToIpcFunction(key, value)
    }
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
