export type Filename = `${string}.svg`

export type SimpleSerializableValue = string | number | null

export type IpcFunctions = {
  "save-svg": {
    args: [[...string[], Filename], svg: string]
    response: { success: true; path: string } | { success: false }
  }
  "open-file": {
    args: [file: string]
    response: boolean
  }
  "save-settings": {
    args: [settingsJson: Record<string, SimpleSerializableValue>]
    response: boolean
  }
  "load-settings": {
    args: [null]
    response: Record<string, SimpleSerializableValue>
  }
}

export type IpcFunction<K extends keyof IpcFunctions> = (
  ...args: IpcFunctions[K]["args"]
) => Promise<IpcFunctions[K]["response"]>
