import { Canvas } from "@react-three/fiber"
import { Splitter, SplitterPanel } from "primereact/splitter"

import ControlPanel from "./controls/ControlPanel"
import SceneContainer from "./SceneContainer"
import Toolbar from "./Toolbar"
import { useStyles } from "../hooks/useStyles"

export default function Frame() {
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
        width: "fit-content",
        backgroundColor: "aliceblue",
        boxShadow: "6px 6px 10px rgba(44, 73, 119, 0.405)",
      },
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
    []
  )

  return (
    <div style={styles.frame}>
      <Toolbar />
      <Splitter style={styles.splitter}>
        <SplitterPanel style={styles.splitterControlPanel}>
          <ControlPanel />
        </SplitterPanel>
        <SplitterPanel style={styles.splitterDisplayPanel}>
          <div style={styles.canvasAndBackground}>
            <div style={styles.canvasWrapper}>
              <Canvas>
                <SceneContainer />
              </Canvas>
            </div>
          </div>
        </SplitterPanel>
      </Splitter>
    </div>
  )
}
