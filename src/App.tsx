/* eslint-disable react/no-unknown-property */
import { Suspense, useRef, useState } from "react"

import "./App.css"
import { PerspectiveCamera as PerspectiveCameraDrei } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { useHotkeys } from "react-hotkeys-hook"
import { PerspectiveCamera, Scene } from "three"

import Box from "./shape/Box"

function App() {
  const scene = useRef<Scene>(null)
  const divRef = useRef<HTMLDivElement>(null)
  const camera = useRef<PerspectiveCamera>(null)
  useHotkeys("command+ctrl+y", () => console.log("tesdt"))

  // const save = useCallback(() => {
  //   if (!scene.current || !divRef.current || !camera.current) {
  //     return
  //   }

  //   sceneToSvg({
  //     scene: scene.current,
  //     camera: camera.current,
  //     ignoreVisibility: false,
  //     size: { y: divRef.current.clientHeight, x: divRef.current.clientWidth },
  //   })
  // }, [])

  // useHotkeys("cmd+6", () => console.log("here"),[]);
  const [fov, setFov] = useState(45)

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      className="App"
      onClick={() => {
        const newFov = Math.random() * 180
        console.log({ newFov })
        setFov(newFov)
      }}>
      <Suspense />
      <div ref={divRef}>
        <Canvas>
          <PerspectiveCameraDrei
            ref={camera}
            fov={fov}
            makeDefault
            aspect={1200 / 600}
            onUpdate={(self) => self.updateProjectionMatrix()}
          />
          {camera.current && <cameraHelper args={[camera.current]} />}
          <scene
            ref={scene}
            onClick={() => {
              const newFov = Math.random() * 180
              console.log({ newFov })
              setFov(newFov)
            }}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Box
              position={[-1.2, 0, 0]}
              onClick={() => {
                const newFov = Math.random() * 180
                console.log({ newFov })
                setFov(newFov)
              }}
            />
            <Box
              position={[1.2, 0, 0]}
              onClick={() => {
                const newFov = Math.random() * 180
                console.log({ newFov })
                setFov(newFov)
              }}
            />
          </scene>
        </Canvas>
      </div>
    </div>
  )
}

export default App
