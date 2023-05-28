export type Filename = `${string}.svg`

export type IpcFunctions = {
  "save-svg": {
    args: [[...string[], Filename], svg: string]
    response: boolean
  }
}
