import { useCallback, useEffect, useRef, useState } from "react"

import { Box, OrbitControls } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { isHotkeyPressed } from "react-hotkeys-hook"
import { PerspectiveCamera as PerspectiveCameraType, Scene } from "three"

import { Height, Width } from "../AppState"
import { useShortcutOverride } from "../hooks/useShortcut"
import Key from "../types/keys/AllKeys"
import sceneToSvg from "../util/svg/sceneToSvg"

interface SceneContainerProps {}

export default function SceneContainer(props: SceneContainerProps) {
  if (props) {
    // pass
  }

  const scene = useRef<Scene>(null)

  const camera = useRef<PerspectiveCameraType>(null)
  const [, setFov] = useState(45)
  const { gl: renderer } = useThree()

  const save = useCallback(() => {
    if (!scene.current || !camera.current) {
      return
    }

    sceneToSvg({
      scene: scene.current,
      camera: camera.current,
      ignoreVisibility: false,
      size: { y: Height, x: Width },
    })
  }, [])

  useShortcutOverride([Key.Cmd, "s"], save)
  useShortcutOverride(
    [
      [Key.Cmd, Key.Up],
      [Key.Shift, Key.Cmd, Key.Up],
    ],
    () => {
      const shiftDown = isHotkeyPressed(Key.Shift)
      return setFov((oldFov) => (shiftDown ? oldFov + 10 : oldFov + 1))
    }
  )

  useShortcutOverride(
    [
      [Key.Cmd, Key.Down],
      [Key.Shift, Key.Cmd, Key.Down],
    ],
    () => {
      const shiftDown = isHotkeyPressed(Key.Shift)
      return setFov((oldFov) => (shiftDown ? oldFov - 10 : oldFov - 1))
    }
  )

  useEffect(() => {
    renderer.setSize(Width, Height)
  })

  return (
    <>
      {/* <PerspectiveCamera
        ref={camera}
        fov={fov}
        makeDefault
        aspect={Width / Height}
      /> */}
      {/* eslint-disable-next-line react/no-unknown-property */})
      {/* {camera.current && <cameraHelper args={[camera.current]} />}; */}
      <scene ref={scene}>
        <ambientLight />
        {/* eslint-disable-next-line react/no-unknown-property */}
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </scene>
      <OrbitControls
        makeDefault
        onChange={() => console.log("changing somethig")}
      />
    </>
  )
}
