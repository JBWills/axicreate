import { Canvas } from "@react-three/fiber"
import "./Frame.css"
import { Splitter, SplitterPanel } from "primereact/splitter"

import ControlPanel from "./controls/ControlPanel"
import SceneContainer from "./SceneContainer"
import Toolbar from "./Toolbar"

export default function Frame() {
  return (
    <div className="Frame">
      <Toolbar />
      <Splitter
        style={{
          flexGrow: 1,
          width: "100%",
          overflow: "hidden",
          borderRadius: 0,
          border: 0,
        }}>
        <SplitterPanel style={{ overflow: "scroll" }}>
          <ControlPanel />
        </SplitterPanel>
        <SplitterPanel style={{ overflow: "hidden" }}>
          <div className="CanvasAndBackground">
            <div className="CanvasWrapper">
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
