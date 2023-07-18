import { atom } from "recoil"

import { SerializableState } from "../../../shared/types/SerializableState"
import { Point3, V3 } from "../../types/V3"

export type CameraStateType =
  | {
      type: "perspective"
      focalLength: number
      position: V3
      rotation: V3
    }
  | {
      type: "isometric"
      focalLength?: number
      position: V3
      rotation: V3
    }

export const DefaultFov = 75

export const DefaultCameraState: CameraStateType = {
  type: "perspective",
  focalLength: DefaultFov,
  position: new V3(0, 0, 0),
  rotation: new V3(0, 0, 0),
}

const KEY = "Camera"
export const CameraState = atom<CameraStateType>({
  key: KEY,
  default: DefaultCameraState,
})

export type SerializableCameraStateType =
  | {
      type: "perspective"
      focalLength: number
      position: Point3
      rotation: Point3
    }
  | {
      type: "isometric"
      position: Point3
      rotation: Point3
    }

export function serializeCameraState(state: CameraStateType): string {
  const serialzableState: SerializableCameraStateType = {
    ...state,
    position: state.position.toPoint3(),
    rotation: state.position.toPoint3(),
  }

  return JSON.stringify(serialzableState)
}

export function deserializeCameraState(json: string | undefined): CameraStateType | undefined {
  const serializableState = JSON.parse(json)

  return {
    ...serializableState,
    position: V3.from(serializableState.position),
    rotation: V3.from(serializableState.rotation),
  }
}

export const serializableCameraState: SerializableState<"Camera", CameraStateType, string> = {
  key: KEY,
  type: "frame-state",
  defaultValue: DefaultCameraState,
  recoilState: CameraState,
  toJson: serializeCameraState,
  fromJson: deserializeCameraState,
}
