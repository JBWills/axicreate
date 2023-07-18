import { RecoilState } from "recoil"

import { SketchName } from "./sketchNames"
/**  state that is shared across the entire app (ex: which sketch + preset is selected) */

export type CoreAppStateType = {
  type: "core-app-state"
}

/**
 * state that's saved as part of the specific sketch and preset but that is shared
 * across all sketches
 * */
export type FrameStateType = {
  type: "frame-state"
}

/**
 * state that's saved as part of the specific sketch and preset but that is shared
 * across all sketches
 * */
export type SketchStateType = {
  type: "sketch-state"
  sketchName: SketchName
}

export type StateType = CoreAppStateType | FrameStateType | SketchStateType

export const SerializableStateKeys = [
  "CurrentSketchState",
  "ZoomLevel",
  "PaperState",
  "Draw",
  "BoundRectState",
  "Camera",
] as const

export type SerializableStateKeysType = (typeof SerializableStateKeys)[number]

export type StateRegistry = {
  //
  // Core app state
  //
  CurrentSketchState: {
    stateType: CoreAppStateType
  }
  //
  // Frame state
  //
  ZoomLevel: {
    stateType: FrameStateType
  }
  PaperState: {
    stateType: FrameStateType
  }
  Draw: {
    stateType: FrameStateType
  }
  BoundRectState: {
    stateType: FrameStateType
  }
  Camera: {
    stateType: FrameStateType
  }
  //
  // Sketch state
  //
}

export type SerializableState<
  K extends SerializableStateKeysType,
  ValueType,
  SerializedType
> = StateRegistry[K]["stateType"] & {
  key: K
  defaultValue: ValueType
  recoilState: RecoilState<ValueType>
  toJson: (data: ValueType) => SerializedType
  fromJson: (s: SerializedType | undefined, defaultValue: ValueType) => ValueType
}
