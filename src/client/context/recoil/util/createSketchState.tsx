import { FC } from "react"

import { RecoilState, atom } from "recoil"

import { SketchName } from "src/shared/types/sketchNames"

import { RecoilSelectors, getSelectors } from "./getSelectors"
import { SketchState } from "./SketchState"
import { SerializableState } from "../serialization/SerializableState"

export type SketchRenderData<T> = {
  recoilState: RecoilState<T>
  selectors: RecoilSelectors<keyof T, T>
}

export function createSketchState<
  T extends Record<string | number | symbol, any>,
  N extends SketchName
>({
  sketchName,
  defaultValue,
  ControlsComponent,
  SceneComponent,
}: {
  sketchName: N
  defaultValue: T
  ControlsComponent: FC<SketchRenderData<T>>
  SceneComponent: FC<SketchRenderData<T>>
}): SketchState<T, N> {
  const stateKey: `${N}State` = `${sketchName}State`
  const recoilState = atom({
    key: stateKey,
    default: defaultValue,
  })

  const serializableState: SerializableState<T, string, `${N}State`> = {
    key: stateKey,
    type: "sketch-state",
    sketchName,
    defaultValue,
    recoilState,
    toJson: (data) => JSON.stringify(data),
    fromJson: (json) => (json ? JSON.parse(json) : undefined),
  }

  const selectors = getSelectors(recoilState, defaultValue)

  const renderData = {
    recoilState,
    selectors,
  }

  console.log(SceneComponent)

  return {
    selectors,
    serializableState,
    ControlsComponent: () => <ControlsComponent {...renderData} />,
    SceneComponent: () => <SceneComponent {...renderData} />,
  }
}
