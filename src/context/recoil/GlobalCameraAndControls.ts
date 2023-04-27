import { atom, useRecoilValue } from "recoil"
import { Camera } from "three"
import { OrbitControls } from "three-stdlib"

export type GlobalCameraAndControlsStateType = {
  camera: Camera | undefined
  controls: OrbitControls | undefined

  // increment this each time the camera or controls change
  version: number
}

export const GlobalCameraAndControlsState =
  atom<GlobalCameraAndControlsStateType>({
    key: "GlobalCameraAndControls",
    default: {
      camera: undefined,
      controls: undefined,
      version: 0,
    },
    dangerouslyAllowMutability: true,
  })

export function useCamera(): Camera | undefined {
  const state = useRecoilValue(GlobalCameraAndControlsState)
  return state.camera
}

export function useControls(): OrbitControls | undefined {
  const { controls } = useRecoilValue(GlobalCameraAndControlsState)
  return controls
}
