import { useEffect, useRef, useState } from "react"

import { useThree } from "@react-three/fiber"
import { isHotkeyPressed } from "react-hotkeys-hook"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { Scene } from "three"

import AxiOrbitControls from "./controls/AxiOrbitControls"
import WaveScene from "./scenes/WaveScene"
import { BoundRectBoundsState } from "../context/recoil/BoundRectState"
import { DrawState } from "../context/recoil/DrawState"
import { GlobalCameraAndControlsState } from "../context/recoil/GlobalCameraAndControls"
import { PaperColorState, WidthHeightState } from "../context/recoil/PaperState"
import { SavingState } from "../context/recoil/SavingState"
import { ZoomLevelState } from "../context/recoil/VirtualCanvasState"
import { useShortcutOverride } from "../hooks/useShortcut"
import { loadSettings, saveSettings } from "../saveload/saveSettings"
import AxiBox from "../shape/AxiBox"
import AxiLine from "../shape/AxiLine"
import { Group } from "../shape/rendering/Group"
import Key from "../types/keys/AllKeys"
import { V3 } from "../types/V3"
import { AxiRandom } from "../util/random/AxiRandom"
import { sceneToSvg } from "../util/svg/sceneToSvg"
import { coercePerspectiveCamera } from "../util/threeutils/coercePerspectiveCamera"
import { times, timesFlat } from "../util/times"

interface SceneContainerProps {}

export default function SceneContainer({}: SceneContainerProps) {
  const { width, height } = useRecoilValue(WidthHeightState)
  const zoomLevel = useRecoilValue(ZoomLevelState)
  const paperColor = useRecoilValue(PaperColorState)
  const drawState = useRecoilValue(DrawState)
  const setSavingState = useSetRecoilState(SavingState)
  const scene = useRef<Scene>(null)

  const random = new AxiRandom(drawState.randomSeed)

  const [, setFov] = useState(45)
  const { gl: renderer } = useThree()
  const { camera, controls } = useRecoilValue(GlobalCameraAndControlsState)

  const { drawBounds, bounds } = useRecoilValue(BoundRectBoundsState)

  const save = async () => {
    console.log("saving svg")
    const target = controls?.target

    const currentScene = scene.current

    if (!currentScene || !camera || !target) {
      return
    }

    setSavingState(true)

    await sceneToSvg({
      scene: currentScene,
      camera: coercePerspectiveCamera(camera),
      canvasSize: { w: width, h: height },
      target: V3.from(target),
    })

    setSavingState(false)
  }

  useShortcutOverride([Key.Cmd, Key.Shift, "s"], () => {
    save()
  })

  useShortcutOverride([Key.Cmd, "s"], () => {
    console.log("Saving settings")
    saveSettings()
  })

  useShortcutOverride([Key.Cmd, "l"], () => {
    console.log("Loading settings")
    loadSettings()
  })

  useEffect(() => {
    loadSettings()
  }, [])

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
    // renderer.setViewport(
    //   bounds.x * zoomLevel,
    //   bounds.y * zoomLevel,
    //   bounds.width * zoomLevel,
    //   bounds.height * zoomLevel
    // )
  }, [renderer, width, height, zoomLevel, bounds.x, bounds.y, bounds.width, bounds.height])

  const getRandomScale = (): V3 => {
    const getRandom = () => random.nextFloat([1 - drawState.randomizeBoxSize, 1])
    return new V3(getRandom(), getRandom(), getRandom())
  }

  const getRandomRotation = (): V3 => {
    const getRandom = () => random.nextFloat([0, drawState.randomizeBoxRotation])
    return new V3(getRandom(), getRandom(), getRandom())
  }

  const arr = timesFlat(drawState.numBoxes, (i) =>
    timesFlat(drawState.numBoxes, (j) =>
      times(drawState.numBoxes, (k) => (
        <>
          <AxiLine
            polyline={[
              new V3(0.123, 0.456, 0.789),
              new V3(i, j, k).times(1 + drawState.boxSpacing),
              new V3(i, k, j).times(10 + drawState.boxSpacing),
              new V3(k, k, j).times(10 + drawState.boxSpacing),
              new V3(k, j, j).times(10 + drawState.boxSpacing),
              new V3(k, j, j).times(11 + drawState.boxSpacing),
              new V3(0.789, 0.101112, 0.131415),
            ]}
          />
          <AxiBox
            key={`Box: ${i}+${j}+${k}`}
            position={new V3(i, j, k).times(1 + drawState.boxSpacing)}
            scale={getRandomScale()}
            rotation={getRandomRotation()}
          />
        </>
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
        <Group>
          <WaveScene />
        </Group>
      </scene>
      <AxiOrbitControls />
    </Group>
  )
}
