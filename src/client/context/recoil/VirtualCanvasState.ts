import { atom } from "recoil"

import { SerializableState } from "../../../shared/types/SerializableState"

const KEY = "ZoomLevel" as const
const DefaultZoomLevelState = 1.0
export const ZoomLevelState = atom({
  key: "ZoomLevel",
  default: DefaultZoomLevelState,
})

export const serializableZoomLevelState: SerializableState<"ZoomLevel", number, number> = {
  key: KEY,
  type: "frame-state",
  defaultValue: DefaultZoomLevelState,
  recoilState: ZoomLevelState,
  toJson: (data) => data,
  fromJson: (s, defaultValue) => (s === null || s === undefined ? defaultValue : s),
}
