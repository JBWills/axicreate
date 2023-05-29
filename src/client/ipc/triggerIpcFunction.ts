// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcRenderer } from "electron"

import type { IpcFunction, IpcFunctions } from "src/shared/types/IpcFunctions"

export function triggerIpcFunction<T extends keyof IpcFunctions>(
  key: T,
  ...args: Parameters<IpcFunction<T>>
): ReturnType<IpcFunction<T>> {
  return ipcRenderer.invoke(key, ...args)
}
