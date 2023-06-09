export type Filename = `${string}.svg`

export type IpcFunctions = {
  "save-svg": {
    args: [[...string[], Filename], svg: string]
    response: { success: true; path: string } | { success: false }
  }
  "open-file": {
    args: [file: string]
    response: boolean
  }
}

export type IpcFunction<K extends keyof IpcFunctions> = (
  ...args: IpcFunctions[K]["args"]
) => Promise<IpcFunctions[K]["response"]>
