import { useRecoilValue } from "recoil"

import { CurrentSketchState } from "src/client/context/recoil/CurrentSketchState"

import AppControls from "./frameControls/AppControls"
import BoundRectControls from "./frameControls/BoundRectControls"
import CameraControls from "./frameControls/CameraControls"
import PaperControls from "./frameControls/PaperControls"
import { useStyles } from "../../hooks/useStyles"
import SketchNameToRenderer from "../sketches/SketchNameToRenderer"

interface ControlPanelProps {}

export default function ControlPanel({}: ControlPanelProps) {
  const currentSketch = useRecoilValue(CurrentSketchState)
  const styles = useStyles(
    () => ({
      controlPanelContainer: {
        width: "100%",
        padding: 10,
        paddingBottom: 50,
        minWidth: 200,
      },
    }),
    []
  )

  const { ControlsComponent } = SketchNameToRenderer[currentSketch.name]

  return (
    <div style={styles.controlPanelContainer}>
      <AppControls />
      <PaperControls />
      <CameraControls />
      <BoundRectControls />
      <ControlsComponent />
    </div>
  )
}
