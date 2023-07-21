import { FC } from "react"

import { SketchName } from "src/shared/types/sketchNames"

import { RecoilSelectors } from "./getSelectors"
import { SerializableState } from "../serialization/SerializableState"

export type SketchState<T, N extends SketchName> = {
  selectors: RecoilSelectors<keyof T, T>
  serializableState: SerializableState<T, string, `${N}State`>
  ControlsComponent: FC
  SceneComponent: FC
}
