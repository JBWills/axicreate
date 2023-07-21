import { atom, selector } from "recoil"

import { SerializableState } from "./serialization/SerializableState"
import { DefaultPaper, Orientation, PaperName, getPaper, getPaperSizePx } from "../../print/Paper"

export type PaperStateType = {
  name: PaperName
  orientation: Orientation
}

export const DefaultPaperState: PaperStateType = {
  name: DefaultPaper,
  orientation: "landscape",
}

export const PaperState = atom<PaperStateType>({
  key: "PaperState",
  default: DefaultPaperState,
})

export const WidthHeightState = selector({
  key: "WidthHeightState",
  get: ({ get }) => {
    const { name, orientation } = get(PaperState)
    const { w: width, h: height } = getPaperSizePx(name, orientation)

    return { width, height }
  },
})

export const PaperColorState = selector({
  key: "PaperColorState",
  get: ({ get }) => {
    const { name } = get(PaperState)
    const { backgroundColor, strokeColor } = getPaper(name)

    return { backgroundColor, strokeColor }
  },
})

export const serializablePaperState = {
  key: "PaperState",
  type: "frame-state",
  defaultValue: DefaultPaperState,
  recoilState: PaperState,
  toJson: (data: PaperStateType) => JSON.stringify(data),
  fromJson: (s: string | undefined, defaultValue: PaperStateType) =>
    s ? { ...defaultValue, ...JSON.parse(s) } : defaultValue,
} satisfies SerializableState<PaperStateType, string>
