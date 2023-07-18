// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcRenderer } from "electron"

import type { IpcFunction, IpcFunctions } from "src/shared/types/IpcFunctions"

export function triggerIpcFunction<T extends keyof IpcFunctions>(
  key: T,
  ...args: Parameters<IpcFunction<T>>
): ReturnType<IpcFunction<T>> {
  console.log("Triggering IPC function", key, args)
  return ipcRenderer.invoke(key, ...args) as ReturnType<IpcFunction<T>>
}
