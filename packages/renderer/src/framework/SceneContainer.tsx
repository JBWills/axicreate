import { useEffect, useRef, useState } from "react"

import { useThree } from "@react-three/fiber"
import { isHotkeyPressed } from "react-hotkeys-hook"
import { useRecoilValue } from "recoil"
import { Euler, Scene } from "three"

import AxiOrbitControls from "./controls/AxiOrbitControls"
import { CameraState } from "../context/recoil/CameraState"
import { DrawState } from "../context/recoil/DrawState"
import { GlobalCameraAndControlsState } from "../context/recoil/GlobalCameraAndControls"
import { PaperColorState, WidthHeightState } from "../context/recoil/PaperState"
import { ZoomLevelState } from "../context/recoil/VirtualCanvasState"
import { useShortcutOverride } from "../hooks/useShortcut"
import AxiBox from "../shape/AxiBox"
import { Group } from "../shape/rendering/Group"
import Key from "../types/keys/AllKeys"
import { V3 } from "../types/V3"
import { AxiRandom } from "../util/random/AxiRandom"
import { sceneToSvg } from "../util/svg/sceneToSvg"
import { coercePerspectiveCamera } from "../util/threeutils/coercePerspectiveCamera"
import { times, timesFlat } from "../util/times"

interface SceneContainerProps {}

let z = 0

export default function SceneContainer(props: SceneContainerProps) {
  const { width, height } = useRecoilValue(WidthHeightState)
  const zoomLevel = useRecoilValue(ZoomLevelState)
  const paperColor = useRecoilValue(PaperColorState)
  const cameraState = useRecoilValue(CameraState)
  const drawState = useRecoilValue(DrawState)
  const scene = useRef<Scene>(null)

  const random = new AxiRandom(drawState.randomSeed)

  const [, setFov] = useState(45)
  const { gl: renderer } = useThree()
  const { camera, controls } = useRecoilValue(GlobalCameraAndControlsState)
  console.log("rerendering!!!", { camera, controls })

  z += 1
  console.log({ z })
  const x = z
  const save = () => {
    console.log("saving svg")
    const target = controls?.target

    const currentScene = scene.current

    console.log({ currentScene, camera, target, x })

    if (!currentScene || !camera || !target) {
      return
    }

    sceneToSvg({
      scene: currentScene,
      camera: coercePerspectiveCamera(camera),
      canvasSize: { w: width, h: height },
      target: V3.from(target),
    })
  }
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

  const getRandomScale = (): V3 => {
    const getRandom = () => random.nextFloat([1 - drawState.randomizeBoxSize, 1])
    return new V3(getRandom(), getRandom(), getRandom())
  }

  const getRandomRotation = (): Euler => {
    const getRandom = () => random.nextFloat([0, drawState.randomizeBoxRotation])
    return new Euler(getRandom(), getRandom(), getRandom())
  }

  const arr = timesFlat(drawState.numBoxes, (i) =>
    timesFlat(drawState.numBoxes, (j) =>
      times(drawState.numBoxes, (k) => (
        <AxiBox
          position={new V3(i, j, k).times(1 + drawState.boxSpacing)}
          scale={getRandomScale()}
          rotation={getRandomRotation()}
        />
      ))
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
      <AxiOrbitControls />
    </Group>
  )
}
