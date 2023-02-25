import { Canvas } from "@react-three/fiber"

import "./Frame.css"
import SceneContainer from "./SceneContainer"
import Toolbar from "./Toolbar"

export default function Frame() {
  return (
    <div className="Frame">
      <Toolbar />
      <div className="CanvasAndBackground">
        <div className="CanvasWrapper">
          <Canvas>
            <SceneContainer />
          </Canvas>
        </div>
      </div>
    </div>
  )
}
