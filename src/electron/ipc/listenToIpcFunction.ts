// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcMain } from "electron"

import unreachable from "src/client/util/unreachable"

import { IpcFunctions } from "../../shared/types/IpcFunctions"

export async function listenToIpcFunction<T extends keyof IpcFunctions>(
  key: T,
  handler: IpcFunctions[T]
) {
  ipcMain.handle(key, (_, ...args: Parameters<IpcFunctions[T]>) => {
    if (args.length === 1) {
      return handler(args[0] as never, undefined, undefined)
    } else if (args.length === 2) {
      return handler(args[0] as never, args[1], undefined)
    } else if (args.length === 3) {
      return handler(args[0] as never, args[1], args[2])
    }

    unreachable(args)
  })
}
