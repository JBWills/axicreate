import { atom } from "recoil"

import { V3 } from "../../types/V3"

export type CameraStateType =
  | {
      type: "perspective"
      focalLength: number
      position: V3
      rotation: V3
    }
  | {
      type: "isometric"
      position: V3
      rotation: V3
    }

export const DefaultFov = 75

export const CameraState = atom<CameraStateType>({
  key: "Camera",
  default: {
    type: "perspective",
    focalLength: DefaultFov,
    position: new V3(0, 0, 0),
    rotation: new V3(0, 0, 0),
  },
})
