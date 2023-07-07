import { SimpleSerializableValue } from "src/shared/types/IpcFunctions"

import { BoundRectStateType, serializableBoundRectState } from "../context/recoil/BoundRectState"
import { CameraStateType, serializableCameraState } from "../context/recoil/CameraState"
import { serializableDrawState } from "../context/recoil/DrawState"
import { PaperStateType, serializablePaperState } from "../context/recoil/PaperState"
import {
  isSerializableStateRegistered,
  loadStates,
  registerSerializableState,
  serializeState as getSerializedState,
} from "../context/recoil/SerializableState"
import { serializableZoomLevelState } from "../context/recoil/VirtualCanvasState"
import { triggerIpcFunction } from "../ipc/triggerIpcFunction"

// save camera state
// save bound rect state
// save paper state
// save virtual canvas state

type SettingsObj = {
  cameraState: CameraStateType
  paperState: PaperStateType
  zoomState: number
  boundRectState: BoundRectStateType
}

export function saveSettings(): Promise<boolean> {
  return triggerIpcFunction("save-settings", getSerializedState())
}

export async function loadSettings() {
  if (!isSerializableStateRegistered()) {
    registerSerializableState(serializableCameraState)
    registerSerializableState(serializableDrawState)
    registerSerializableState(serializableBoundRectState)
    registerSerializableState(serializablePaperState)
    registerSerializableState(serializableZoomLevelState)
  }

  const loadJsonResult: Record<string, SimpleSerializableValue> = await triggerIpcFunction(
    "load-settings",
    null
  )

  if (!loadJsonResult) {
    return
  }

  loadStates(loadJsonResult)
}
