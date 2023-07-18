// eslint-disable-next-line import/no-extraneous-dependencies
import settings from "electron-settings"

import { SimpleSerializableValue } from "src/shared/types/IpcFunctions"
import { SketchName } from "src/shared/types/sketchNames"

const SETTINGS_KEY_DEFAULT = "default"
const CORE_APP_DEFAULT = "default.core_app"

export async function saveSettingsJson(
  json: Record<string, SimpleSerializableValue>,
  sketchName: SketchName,
  sketchPreset: string | undefined
): Promise<boolean> {
  const keyPath = getSettingsKeyPath(sketchName, sketchPreset)
  console.log("Saving settings to ", keyPath, json)
  await settings.set(keyPath, json)
  return true
}

export async function loadSettingsJson(
  sketchName: SketchName,
  sketchPreset: string | undefined
): Promise<Record<string, SimpleSerializableValue> | undefined> {
  const keyPath = getSettingsKeyPath(sketchName, sketchPreset)
  console.log("Loading settings from", keyPath)
  const result = (await settings.get(keyPath)) || undefined
  return result as Record<string, SimpleSerializableValue> | undefined
}

export async function loadCoreAppSettings(): Promise<
  Record<string, SimpleSerializableValue> | undefined
> {
  const result = (await settings.get(CORE_APP_DEFAULT)) || undefined
  return result as Record<string, SimpleSerializableValue> | undefined
}

export async function saveCoreAppSettings(
  json: Record<string, SimpleSerializableValue>
): Promise<boolean> {
  await settings.set(CORE_APP_DEFAULT, json)
  return true
}

function getSettingsKeyPath(sketchName: SketchName, sketchPreset: string | undefined): string[] {
  return [sketchName, sketchPreset || SETTINGS_KEY_DEFAULT]
}
