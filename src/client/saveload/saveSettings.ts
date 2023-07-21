import { getRecoil } from "recoil-nexus"

import { triggerIpcFunction } from "src/client/ipc/triggerIpcFunction"
import { SimpleSerializableValue } from "src/shared/types/IpcFunctions"
import { objectValues } from "src/shared/util/objectKeys"

import { CurrentSketchNameAndPresetState } from "../context/recoil/CurrentSketchState"
import {
  toSerializableData,
  loadStates,
  serializeState,
  SerializableConfigs,
} from "../context/recoil/serialization/SerializableStateHelpers"
import { SerializableStateKeys } from "../context/recoil/serialization/SerializableStateKeys"

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
  const coreAppConfigs = objectValues(SerializableConfigs)
    .filter((config) => config.type === "core-app-state")
    .map((config) => config.key)

  const jsonResult = await getJsonResultForKeys(coreAppConfigs)

  return triggerIpcFunction("save-core-app-settings", jsonResult)
}

async function getJsonResultForKeys(keys: SerializableStateKeys[]) {
  const jsonResult: { [k in SerializableStateKeys]?: SimpleSerializableValue } = {}

  for (const key of keys) {
    const config = SerializableConfigs[key]
    jsonResult[config.key] = toSerializableData(config.key)
  }

  return jsonResult
}
