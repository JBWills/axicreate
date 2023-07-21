import { RecoilState } from "recoil"
import { getRecoil, setRecoil } from "recoil-nexus"

import { WaveGridSketchState } from "src/client/framework/sketches/WaveGridSketch"
import { WaveSketchState } from "src/client/framework/sketches/WaveSketch"
import { SimpleSerializableValue } from "src/shared/types/IpcFunctions"
import { objectKeys } from "src/shared/util/objectKeys"

import { SerializableState, StateType } from "./SerializableState"
import { SerializableStateKeys } from "./SerializableStateKeys"
import { serializableBoundRectState } from "../BoundRectState"
import { serializableCameraState } from "../CameraState"
import { serializableCurrentSketchState } from "../CurrentSketchState"
import { serializableDrawState } from "../DrawState"
import { serializablePaperState } from "../PaperState"
import { serializableZoomLevelState } from "../VirtualCanvasState"

export const SerializableConfigs = {
  BoundRectState: serializableBoundRectState,
  Camera: serializableCameraState,
  CurrentSketchState: serializableCurrentSketchState,
  Draw: serializableDrawState,
  PaperState: serializablePaperState,
  ZoomLevel: serializableZoomLevelState,
  WaveState: WaveSketchState.serializableState,
  WaveGridState: WaveGridSketchState.serializableState,
} satisfies { [k in SerializableStateKeys]: SerializableState<unknown, unknown> & { key: k } }

export function toSerializableData<K extends SerializableStateKeys>(
  key: K
): SimpleSerializableValue {
  const s = SerializableConfigs[key]
  const sData = getRecoil(s.recoilState as RecoilState<unknown>)
  return s.toJson(sData as never)
}

export function loadStates(json: Record<string, SimpleSerializableValue>) {
  for (const s of objectKeys(SerializableConfigs)) {
    const serializableState = SerializableConfigs[s]
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
  for (const s of objectKeys(SerializableConfigs)) {
    const serializableState = SerializableConfigs[s]
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
