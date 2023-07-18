import { RecoilState } from "recoil"
import { getRecoil, setRecoil } from "recoil-nexus"

import { SimpleSerializableValue } from "src/shared/types/IpcFunctions"
import {
  StateType,
  SerializableStateKeysType,
  SerializableState,
  SerializableStateKeys,
} from "src/shared/types/SerializableState"

import { serializableBoundRectState } from "./BoundRectState"
import { serializableCameraState } from "./CameraState"
import { serializableCurrentSketchState } from "./CurrentSketchState"
import { serializableDrawState } from "./DrawState"
import { serializablePaperState } from "./PaperState"
import { serializableZoomLevelState } from "./VirtualCanvasState"
import unreachable from "../../util/unreachable"

export function toSerializableData<K extends SerializableStateKeysType>(
  key: K
): SimpleSerializableValue {
  const s = keyToConfig(key)
  const sData = getRecoil(s.recoilState as any)
  return s.toJson(sData as any)
}

type KeyToConfigType = {
  BoundRectState: typeof serializableBoundRectState
  Camera: typeof serializableCameraState
  CurrentSketchState: typeof serializableCurrentSketchState
  Draw: typeof serializableDrawState
  PaperState: typeof serializablePaperState
  ZoomLevel: typeof serializableZoomLevelState
}

export function keyToConfig<K extends SerializableStateKeysType>(key: K): KeyToConfigType[K] {
  let result: SerializableState<SerializableStateKeysType, unknown, any>
  switch (key) {
    case "BoundRectState":
      key satisfies "BoundRectState"
      result = serializableBoundRectState
      break
    case "Camera":
      result = serializableCameraState
      break
    case "CurrentSketchState":
      result = serializableCurrentSketchState
      break
    case "Draw":
      result = serializableDrawState
      break
    case "PaperState":
      result = serializablePaperState
      break
    case "ZoomLevel":
      result = serializableZoomLevelState
      break
    default:
      unreachable(key)
  }

  // Have to do this because I can't figure out how to properly narrow the "K" type inside of the case statements
  return result as KeyToConfigType[K]
}

export function loadStates(json: Record<string, SimpleSerializableValue>) {
  for (const s of SerializableStateKeys) {
    const serializableState = keyToConfig(s)
    if (s in json) {
      const jsonVal = json[s]

      console.log(
        "Setting state",
        serializableState.key,
        serializableState.fromJson(jsonVal as never, serializableState.defaultValue as never)
      )

      setRecoil(
        serializableState.recoilState,
        serializableState.fromJson(jsonVal as never, serializableState.defaultValue as never)
      )
    }
  }
}

export function serializeState(type: StateType): Record<string, SimpleSerializableValue> {
  const obj: Record<string, SimpleSerializableValue> = {}
  for (const s of SerializableStateKeys) {
    const serializableState = keyToConfig(s)
    if (
      // frame states should be saved with sketch states
      !(type.type === "sketch-state" && serializableState.type === "frame-state") &&
      !equalTypes(serializableState, type)
    ) {
      continue
    }

    const value = getRecoil(serializableState.recoilState as RecoilState<any>)
    if (!value) {
      continue
    }

    obj[serializableState.key] = serializableState.toJson(value)
  }

  return obj
}

function equalTypes(type1: StateType, type2: StateType): boolean {
  if (type1.type !== type2.type) {
    return false
  }

  if (type1.type === "sketch-state" && type2.type === "sketch-state") {
    return type1.sketchName === type2.sketchName
  }

  return true
}
