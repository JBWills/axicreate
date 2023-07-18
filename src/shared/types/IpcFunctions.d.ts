import { SketchName } from "src/shared/types/sketchNames"

export type Filename = `${string}.svg`

export type SimpleSerializableValue = string | number | null

export type IpcFunctions = {
  "save-svg": (
    filePath: [...string[], Filename],
    svg: string
  ) => Promise<{ success: true; path: string } | { success: false }>

  "open-file": (file: string) => Promise<boolean>

  "save-settings": (
    settingsJson: Record<string, SimpleSerializableValue>,
    sketchName: SketchName,
    sketchPreset: string | undefined
  ) => Promise<boolean>

  "load-settings": (
    sketchName: SketchName,
    sketchPreset: string | undefined
  ) => Promise<Record<string, SimpleSerializableValue> | undefined>
  "load-core-app-settings": (n: null) => Promise<Record<string, SimpleSerializableValue>>
  "save-core-app-settings": (json: Record<string, SimpleSerializableValue>) => Promise<boolean>
}

export type IpcFunction<K extends keyof IpcFunctions> = IpcFunctions[K]
