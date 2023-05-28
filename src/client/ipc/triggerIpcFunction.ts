// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcRenderer } from "electron"

import type { IpcFunctions } from "src/electron/types/IpcFunctions"

export function triggerIpcFunction<T extends keyof IpcFunctions>(
  key: T,
  ...args: IpcFunctions[T]["args"]
): Promise<IpcFunctions[T]["response"]> {
  return ipcRenderer.invoke(key, ...args)
}
