import { useEffect, useRef } from "react"

import { useThree } from "@react-three/fiber"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { Scene } from "three"

import AxiOrbitControls from "./controls/AxiOrbitControls"
import WaveScene from "./scenes/WaveScene"
import { showToast } from "./toasts/showToast"
import { GlobalCameraAndControlsState } from "../context/recoil/GlobalCameraAndControls"
import { PaperColorState, WidthHeightState } from "../context/recoil/PaperState"
import { SavingState } from "../context/recoil/SavingState"
import { ZoomLevelState } from "../context/recoil/VirtualCanvasState"
import { useShortcutOverride } from "../hooks/useShortcut"
import { loadMostRecentSketchAndPreset, loadSettings, saveSettings } from "../saveload/saveSettings"
import { Group } from "../shape/rendering/Group"
import Key from "../types/keys/AllKeys"
import { V3 } from "../types/V3"
import { sceneToSvg } from "../util/svg/sceneToSvg"
import { coercePerspectiveCamera } from "../util/threeutils/coercePerspectiveCamera"

interface SceneContainerProps {}

export default function SceneContainer({}: SceneContainerProps) {
  const { width, height } = useRecoilValue(WidthHeightState)
  const zoomLevel = useRecoilValue(ZoomLevelState)
  const paperColor = useRecoilValue(PaperColorState)
  const setSavingState = useSetRecoilState(SavingState)
  const scene = useRef<Scene>(null)

  const { gl: renderer } = useThree()
  const { camera, controls } = useRecoilValue(GlobalCameraAndControlsState)

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
    async function loadInitialSettings() {
      await loadMostRecentSketchAndPreset()
      await loadSettings()
    }
    loadInitialSettings()
  }, [])

  useEffect(() => {
    renderer.setSize(width * zoomLevel, height * zoomLevel)
  }, [height, renderer, width, zoomLevel])

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
