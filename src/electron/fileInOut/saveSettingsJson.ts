// eslint-disable-next-line import/no-extraneous-dependencies
import settings from "electron-settings"

import { SimpleSerializableValue } from "src/shared/types/IpcFunctions"

const SETTINGS_KEY_DEFAULT = "default"

export async function saveSettingsJson(
  json: Record<string, SimpleSerializableValue>
): Promise<boolean> {
  await settings.set(SETTINGS_KEY_DEFAULT, json)
  return true
}

export async function loadSettingsJson(): Promise<Record<string, SimpleSerializableValue>> {
  const result = (await settings.get(SETTINGS_KEY_DEFAULT)) ?? undefined
  return result as Record<string, SimpleSerializableValue>
}
