import { useCallback, useEffect, useRef, useState } from "react"

import { OrbitControls } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { isHotkeyPressed } from "react-hotkeys-hook"
import { Color, PerspectiveCamera as PerspectiveCameraType, Scene } from "three"

import { Height, Width } from "../AppState"
import { useShortcutOverride } from "../hooks/useShortcut"
import AxiBox from "../shape/AxiBox"
import { Group } from "../shape/rendering/Group"
import Key from "../types/keys/AllKeys"
import { V2 } from "../types/V2"
import { V3 } from "../types/V3"
import sceneToSvg from "../util/svg/sceneToSvg"
import { times, timesFlat } from "../util/times"

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
      size: new V2(Width, Height),
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

  const arr = timesFlat(10, (i) =>
    timesFlat(10, (j) =>
      times(10, (k) => <AxiBox position={new V3(i * 1.1, j * 1.1, k * 1.1)} />)
    )
  )

  return (
    <>
      <scene ref={scene}>
        <Group color={new Color(0.5, 0.5, 0.5)}>{arr}</Group>
      </scene>
      <OrbitControls makeDefault />
    </>
  )
}
