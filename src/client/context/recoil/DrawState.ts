import { atom } from "recoil"

import { SerializableState } from "../../../shared/types/SerializableState"

export type DrawStateType = {
  randomSeed: number
  numBoxes: number
  boxSpacing: number
  randomizeBoxSize: number
  randomizeBoxRotation: number
}

export const DefaultDrawState: DrawStateType = {
  randomSeed: 0,
  numBoxes: 5,
  boxSpacing: 0.2,
  randomizeBoxSize: 0,
  randomizeBoxRotation: 0,
}

const KEY = "Draw"
export const DrawState = atom({
  key: KEY,
  default: DefaultDrawState,
})

export function serializeDrawState(state: DrawStateType): string {
  return JSON.stringify(state)
}

export function deserializeDrawState(json: string | undefined): DrawStateType | undefined {
  return JSON.parse(json)
}

export const serializableDrawState: SerializableState<"Draw", DrawStateType, string> = {
  key: KEY,
  type: "frame-state",
  defaultValue: DefaultDrawState,
  recoilState: DrawState,
  toJson: serializeDrawState,
  fromJson: deserializeDrawState,
}
