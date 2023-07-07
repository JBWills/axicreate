import { Canvas } from "@react-three/fiber"
import { Splitter, SplitterPanel } from "primereact/splitter"
import { useRecoilValue } from "recoil"

import ControlPanel from "./controls/ControlPanel"
import SceneContainer from "./SceneContainer"
import Toolbar from "./Toolbar"
import { PaperColorState } from "../context/recoil/PaperState"
import { useStyles } from "../hooks/useStyles"

export default function Frame() {
  const { backgroundColor } = useRecoilValue(PaperColorState)
  const styles = useStyles(
    () => ({
      splitter: {
        flexGrow: 1,
        width: "100%",
        overflow: "hidden",
        borderRadius: 0,
        border: 0,
      },
      splitterControlPanel: { overflow: "scroll" },
      splitterDisplayPanel: { overflow: "hidden" },
      frame: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      },
      canvasWrapper: {
        position: "relative",
        width: "fit-content",
        backgroundColor: `#${backgroundColor.getHexString()}`,
        boxShadow: "6px 6px 10px rgba(44, 73, 119, 0.405)",
      },
      sceneWrapper: {},
      canvasAndBackground: {
        width: "100%",
        height: "100%",
        minWidth: 0,
        overflow: "scroll",
        backgroundColor: "steelblue",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
    }),
    [backgroundColor]
  )

  return (
    <div style={styles.frame}>
      <Toolbar />
      <Splitter style={styles.splitter} stateStorage="local">
        <SplitterPanel style={styles.splitterControlPanel} size={10}>
          <ControlPanel />
        </SplitterPanel>
        <SplitterPanel style={styles.splitterDisplayPanel}>
          <div style={styles.canvasAndBackground}>
            <div style={styles.canvasWrapper}>
              <Canvas linear flat>
                <SceneContainer />
              </Canvas>
            </div>
          </div>
        </SplitterPanel>
      </Splitter>
    </div>
  )
}
