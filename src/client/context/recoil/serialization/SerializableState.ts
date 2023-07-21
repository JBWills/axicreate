import { RecoilState } from "recoil"

import { SketchName } from "src/shared/types/sketchNames"

import { SerializableStateKeys } from "./SerializableStateKeys"

export type CoreAppStateType = {
  type: "core-app-state"
  sketchName?: undefined
}

/**
 * state that's saved as part of the specific sketch and preset but that is shared
 * across all sketches
 * */
export type FrameStateType = {
  type: "frame-state"
  sketchName?: undefined
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

export type SerializableState<
  ValueType,
  SerializedType = string,
  KeyType extends SerializableStateKeys = SerializableStateKeys
> = StateType & {
  key: KeyType
  defaultValue: ValueType
  recoilState: RecoilState<ValueType>
  toJson: (data: ValueType) => SerializedType
  fromJson: (s: SerializedType | undefined, defaultValue: ValueType) => ValueType
}

export function createSerializableSketchState() {}
