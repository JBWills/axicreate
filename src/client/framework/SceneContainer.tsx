import { useEffect, useRef, useState } from "react"

import { useThree } from "@react-three/fiber"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { Scene } from "three"

import AxiOrbitControls from "./controls/AxiOrbitControls"
import WaveScene from "./scenes/WaveScene"
import { showToast } from "./toasts/showToast"
import { BoundRectBoundsState } from "../context/recoil/BoundRectState"
import { DrawState } from "../context/recoil/DrawState"
import { GlobalCameraAndControlsState } from "../context/recoil/GlobalCameraAndControls"
import { PaperColorState, WidthHeightState } from "../context/recoil/PaperState"
import { SavingState } from "../context/recoil/SavingState"
import { ZoomLevelState } from "../context/recoil/VirtualCanvasState"
import { useShortcutOverride } from "../hooks/useShortcut"
import { loadSettings, saveSettings } from "../saveload/saveSettings"
import { Group } from "../shape/rendering/Group"
import Key from "../types/keys/AllKeys"
import { V3 } from "../types/V3"
import { AxiRandom } from "../util/random/AxiRandom"
import { sceneToSvg } from "../util/svg/sceneToSvg"
import { coercePerspectiveCamera } from "../util/threeutils/coercePerspectiveCamera"

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
    showToast("Saving svg")
    save()
  })

  useShortcutOverride([Key.Cmd, "s"], () => {
    showToast("Saving settings")
    saveSettings()
  })

  useShortcutOverride([Key.Cmd, "l"], () => {
    showToast("Loading settings")
    loadSettings()
  })

  useEffect(() => {
    loadSettings()
  }, [])

  useEffect(() => {
    renderer.setSize(width * zoomLevel, height * zoomLevel)

    renderer.setViewport(bounds.x, bounds.y, bounds.width, bounds.height)
  }, [bounds.height, bounds.width, bounds.x, bounds.y, height, renderer, width, zoomLevel])

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
