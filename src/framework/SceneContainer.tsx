import { useCallback, useEffect, useRef, useState } from "react"

import { OrbitControls } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { isHotkeyPressed } from "react-hotkeys-hook"
import { useRecoilValue } from "recoil"
import { Scene } from "three"
import { OrbitControls as OrbitControlsImpl } from "three-stdlib"

import { PaperColorState, WidthHeightState } from "../context/recoil/PaperState"
import { ZoomLevelState } from "../context/recoil/VirtualCanvasState"
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
  const { width, height } = useRecoilValue(WidthHeightState)
  const zoomLevel = useRecoilValue(ZoomLevelState)
  const paperColor = useRecoilValue(PaperColorState)
  const scene = useRef<Scene>(null)
  const orbitControls = useRef<OrbitControlsImpl>(null)

  const [, setFov] = useState(45)
  const { gl: renderer } = useThree()

  const save = useCallback(() => {
    const camera = orbitControls.current?.object
    if (!scene.current || !camera) {
      return
    }

    sceneToSvg({
      scene: scene.current,
      camera,
      ignoreVisibility: false,
      size: new V2(width, height),
    })
  }, [height, width, scene])

  useShortcutOverride([Key.Cmd, Key.Alt, "s"], save)
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
    renderer.setSize(width * zoomLevel, height * zoomLevel)
  }, [renderer, width, height, zoomLevel])

  const arr = timesFlat(5, (i) =>
    timesFlat(5, (j) =>
      times(5, (k) => <AxiBox position={new V3(i * 1.5, j * 1.5, k * 1.5)} />)
    )
  )

  return (
    <Group
      isDefaultGroup
      strokeColor={paperColor.strokeColor}
      fillColor={paperColor.backgroundColor}
      strokeWidth={2}>
      <scene ref={scene}>
        <Group>{arr}</Group>
      </scene>
      <OrbitControls makeDefault ref={orbitControls} />
    </Group>
  )
}
