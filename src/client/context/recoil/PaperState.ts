import { atom, selector } from "recoil"

import { DefaultPaper, Orientation, PaperName, getPaper, getPaperSizePx } from "../../print/Paper"

type PaperStateType = {
  name: PaperName
  orientation: Orientation
}

export const PaperState = atom<PaperStateType>({
  key: "PaperState",
  default: {
    name: DefaultPaper,
    orientation: "landscape",
  },
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
