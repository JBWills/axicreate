import { atom, selector } from "recoil"

import { SketchName, isValidSketchName, SketchNames } from "src/shared/types/sketchNames"

import { SerializableState } from "./serialization/SerializableState"

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

export const serializableCurrentSketchState = {
  key: "CurrentSketchState",
  type: "core-app-state",
  defaultValue: DefaultCurrentSketchState,
  recoilState: CurrentSketchState,
  toJson: (data: CurrentSketchStateType) => JSON.stringify(data),
  fromJson: (s: string | undefined, defaultValue: CurrentSketchStateType) => {
    if (!s) {
      return defaultValue
    }

    const parsed: CurrentSketchStateType = JSON.parse(s)

    const newCurrentSketch = isValidSketchName(parsed.name) ? parsed.name : defaultValue.name

    const newPresets: CurrentSketchStateType["sketchNameToMostRecentPresets"] = {
      ...defaultValue.sketchNameToMostRecentPresets,
    }

    for (const sketchName of SketchNames) {
      if (sketchName in parsed.sketchNameToMostRecentPresets) {
        newPresets[sketchName] = parsed.sketchNameToMostRecentPresets[sketchName]
      }
    }

    return { name: newCurrentSketch, sketchNameToMostRecentPresets: newPresets }
  },
} satisfies SerializableState<CurrentSketchStateType, string>
