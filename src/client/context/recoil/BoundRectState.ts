import { atom, selector } from "recoil"

import { WidthHeightState } from "./PaperState"
import { SerializableState } from "./SerializableState"

export type Bounds = {
  x: number
  y: number
  width: number
  height: number
}

export type BoundRectStateType = {
  top: number
  bottom: number
  left: number
  right: number
  type: "percent" | "pixels"
  drawBounds: boolean
}

export const DefaultBoundRectState: BoundRectStateType = {
  top: 0.1,
  bottom: 0.1,
  left: 0.1,
  right: 0.1,
  type: "percent",
  drawBounds: true,
}

const KEY = "BoundRectState"

export const BoundRectState = atom<BoundRectStateType>({
  key: KEY,
  default: DefaultBoundRectState,
})

export const BoundRectBoundsState = selector<{ drawBounds: boolean; bounds: Bounds }>({
  key: "BoundRectBoundsState",
  get: ({ get }) => {
    const boundRectState = get(BoundRectState)
    const { type, drawBounds } = boundRectState
    let { top, bottom, left, right } = boundRectState
    const { width, height } = get(WidthHeightState)

    if (type === "percent") {
      top *= height
      bottom *= height
      left *= width
      right *= width
    }

    return {
      drawBounds,
      bounds: {
        x: left,
        y: top,
        width: width - left - right,
        height: height - top - bottom,
      },
    }
  },
})

export function serializeBoundRectState(state: BoundRectStateType): string {
  return JSON.stringify(state)
}

export function deserializeBoundRectState(
  json: string | undefined
): BoundRectStateType | undefined {
  return JSON.parse(json)
}

export const serializableBoundRectState: SerializableState<BoundRectStateType> = {
  key: KEY,
  defaultValue: DefaultBoundRectState,
  recoilState: BoundRectState,
  toJson: serializeBoundRectState,
  fromJson: deserializeBoundRectState,
}
