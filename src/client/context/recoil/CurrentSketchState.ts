import { atom, selector } from "recoil"

import { SketchName } from "src/shared/types/sketchNames"

import { SerializableState } from "../../../shared/types/SerializableState"

export type CurrentSketchStateType = {
  name: SketchName
  sketchNameToMostRecentPresets: { [k in SketchName]?: string }
}

export const DefaultCurrentSketchState: CurrentSketchStateType = {
  name: "Wave",
  sketchNameToMostRecentPresets: {},
}

export const CurrentSketchState = atom<CurrentSketchStateType>({
  key: "CurrentSketchState",
  default: DefaultCurrentSketchState,
})

export const CurrentSketchNameState = selector({
  key: "CurrentSketchNameState",
  get: ({ get }) => {
    const { name } = get(CurrentSketchState)

    return name
  },
})

export const CurrentSketchPresetState = selector({
  key: "CurrentSketchPresetState",
  get: ({ get }) => {
    const { name, sketchNameToMostRecentPresets } = get(CurrentSketchState)

    if (name in sketchNameToMostRecentPresets) {
      return sketchNameToMostRecentPresets[name]
    }

    return undefined
  },
})

export const CurrentSketchNameAndPresetState = selector({
  key: "CurrentSketchNameAndPresetState",
  get: ({ get }) => {
    const name = get(CurrentSketchNameState)
    const preset = get(CurrentSketchPresetState)

    return { name, preset }
  },
})

export const serializableCurrentSketchState: SerializableState<
  "CurrentSketchState",
  CurrentSketchStateType,
  string
> = {
  key: "CurrentSketchState",
  type: "core-app-state",
  defaultValue: DefaultCurrentSketchState,
  recoilState: CurrentSketchState,
  toJson: (data: CurrentSketchStateType) => JSON.stringify(data),
  fromJson: (s: string | undefined, defaultValue: CurrentSketchStateType) =>
    s ? { ...defaultValue, ...JSON.parse(s) } : defaultValue,
}
