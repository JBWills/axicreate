import { atom } from "recoil"

import { SerializableState } from "./SerializableState"

const KEY = "ZoomLevel"
const DefaultZoomLevelState = 1.0
export const ZoomLevelState = atom({
  key: "ZoomLevel",
  default: DefaultZoomLevelState,
})

export const serializableZoomLevelState: SerializableState<number, number> = {
  key: KEY,
  defaultValue: DefaultZoomLevelState,
  recoilState: ZoomLevelState,
  toJson: (data) => data,
  fromJson: (s, defaultValue) => (s === null || s === undefined ? defaultValue : s),
}
