import AppControls from "./frameControls/AppControls"
import BoundRectControls from "./frameControls/BoundRectControls"
import CameraControls from "./frameControls/CameraControls"
import PaperControls from "./frameControls/PaperControls"
import { useStyles } from "../../hooks/useStyles"
import { WaveSceneControls } from "../scenes/WaveScene"

interface ControlPanelProps {}

export default function ControlPanel({}: ControlPanelProps) {
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

  return (
    <div style={styles.controlPanelContainer}>
      <AppControls />
      <PaperControls />
      <CameraControls />
      <BoundRectControls />
      <WaveSceneControls />
    </div>
  )
}
