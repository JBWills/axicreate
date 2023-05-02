import React, { useEffect, useRef } from "react"

import { OrbitControls } from "@react-three/drei"
import { useRecoilState, useSetRecoilState } from "recoil"
import { Camera, PerspectiveCamera } from "three"
import { OrbitControls as OrbitControlsImpl } from "three-stdlib"

import { CameraState } from "../../context/recoil/CameraState"
import { GlobalCameraAndControlsState } from "../../context/recoil/GlobalCameraAndControls"
import { axiMemo } from "../../hooks/genericMemo"
import { V3 } from "../../types/V3"
import { isPerspectiveCamera } from "../../util/threeutils/coercePerspectiveCamera"

interface AxiOrbitControlsProps {}

function AxiOrbitControls({}: AxiOrbitControlsProps) {
  const orbitControls = useRef<OrbitControlsImpl>(null)
  const [state, setCameraState] = useRecoilState(CameraState)
  const setCameraAndControlsState = useSetRecoilState(GlobalCameraAndControlsState)

  useEffect(() => {
    const camera = orbitControls.current?.object as PerspectiveCamera | undefined

    if (!camera || state.type !== "perspective") {
      return
    }

    if (camera.getFocalLength() !== state.focalLength) {
      camera.setFocalLength(state.focalLength)
      orbitControls.current?.update()
    }
  }, [state])

  return (
    <OrbitControls
      makeDefault
      ref={orbitControls}
      onChange={(p) => {
        const camera = p?.target?.object as Camera

        if (!isPerspectiveCamera(camera) || state.type !== "perspective") {
          return
        }

        console.log("setting camera and controls state")
        setCameraAndControlsState((oldState) => ({
          camera,
          controls: orbitControls.current ?? undefined,
          version: oldState.version + 1,
        }))

        const position = V3.from(camera.position)
        const rotation = V3.from(camera.rotation)
        const focalLength = camera.getFocalLength()

        if (
          focalLength !== state.focalLength ||
          !position.equals(state.position) ||
          !rotation.equals(state.rotation)
        )
          return setCameraState({
            type: "perspective",
            focalLength,
            position,
            rotation,
          })
      }}
    />
  )
}

export default axiMemo(AxiOrbitControls)
