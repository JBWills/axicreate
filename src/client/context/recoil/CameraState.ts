import { atom } from "recoil"

import { SerializableState } from "./serialization/SerializableState"
import { Point3, V3 } from "../../types/V3"

type CameraStateType =
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

const DefaultFov = 75

const DefaultCameraState: CameraStateType = {
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

type SerializableCameraStateType =
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

function serializeCameraState(state: CameraStateType): string {
  const serialzableState: SerializableCameraStateType = {
    ...state,
    position: state.position.toPoint3(),
    rotation: state.position.toPoint3(),
  }

  return JSON.stringify(serialzableState)
}

function deserializeCameraState(json: string | undefined): CameraStateType {
  const serializableState = json ? JSON.parse(json) : undefined

  return {
    ...DefaultCameraState,
    ...serializableState,
    position: V3.from(serializableState.position),
    rotation: V3.from(serializableState.rotation),
  }
}

export const serializableCameraState = {
  key: "Camera",
  type: "frame-state",
  defaultValue: DefaultCameraState,
  recoilState: CameraState,
  toJson: serializeCameraState,
  fromJson: deserializeCameraState,
} satisfies SerializableState<CameraStateType, string>
