// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcMain } from "electron"

import unreachable from "src/client/util/unreachable"

import { IpcFunctions } from "../../shared/types/IpcFunctions"

export async function listenToIpcFunction<T extends keyof IpcFunctions>(
  key: T,
  handler: (...args: IpcFunctions[T]["args"]) => Promise<IpcFunctions[T]["response"]>
) {
  ipcMain.handle(key, (_, ...args: IpcFunctions[T]["args"]) => {
    if (args.length === 1) {
      return handler(args[0])
    } else if (args.length === 2) {
      return handler(args[0], args[1])
    }

    unreachable(args)
  })
}
