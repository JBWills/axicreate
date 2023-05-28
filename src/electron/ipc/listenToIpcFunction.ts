// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcMain } from "electron"

import unreachable from "src/client/util/unreachable"

import { IpcFunctions } from "../types/IpcFunctions"

export async function listenToIpcFunction<T extends keyof IpcFunctions, R extends any>(
  key: T,
  handler: (...args: IpcFunctions[T]["args"]) => Promise<IpcFunctions[T]["response"]>
) {
  ipcMain.handle(key, (_, ...args: IpcFunctions[T]["args"]) => {
    if (key === "save-svg") {
      return handler(args[0], args[1])
    }

    unreachable(key)
  })
}
