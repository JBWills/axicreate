import { getRecoil } from "recoil-nexus"

import { triggerIpcFunction } from "src/client/ipc/triggerIpcFunction"
import { SimpleSerializableValue } from "src/shared/types/IpcFunctions"
import {
  SerializableStateKeys,
  SerializableStateKeysType,
} from "src/shared/types/SerializableState"

import { CurrentSketchNameAndPresetState } from "../context/recoil/CurrentSketchState"
import {
  keyToConfig,
  toSerializableData,
  loadStates,
  serializeState,
} from "../context/recoil/SerializableState"

export function saveSettings(): Promise<boolean> {
  const { name, preset } = getRecoil(CurrentSketchNameAndPresetState)

  return triggerIpcFunction(
    "save-settings",
    serializeState({ type: "sketch-state", sketchName: name }),
    name,
    preset ?? undefined
  )
}

export async function loadSettings() {
  const { name, preset } = getRecoil(CurrentSketchNameAndPresetState)

  console.log("loading")
  const loadJsonResult = await triggerIpcFunction("load-settings", name, preset ?? undefined)

  console.log("Done loading", loadJsonResult)
  if (!loadJsonResult) {
    return
  }

  loadStates(loadJsonResult)
}

export async function loadMostRecentSketchAndPreset() {
  const loadJsonResult = await triggerIpcFunction("load-core-app-settings", null)
  if (!loadJsonResult) {
    return
  }

  console.log("loading core", loadJsonResult)
  loadStates(loadJsonResult)
}

export async function saveCoreAppSettings() {
  const coreAppConfigs = SerializableStateKeys.map((key) => keyToConfig(key))
    .filter((config) => config.type === "core-app-state")
    .map((config) => config.key)

  const jsonResult = await getJsonResultForKeys(coreAppConfigs)

  return triggerIpcFunction("save-core-app-settings", jsonResult)
}

async function getJsonResultForKeys(keys: SerializableStateKeysType[]) {
  const jsonResult: { [k in SerializableStateKeysType]?: SimpleSerializableValue } = {}

  for (const key of keys) {
    const config = keyToConfig(key)
    jsonResult[config.key] = toSerializableData(config.key)
  }

  return jsonResult
}
