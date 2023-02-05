/* eslint-disable react/no-unknown-property */
import { Suspense, useCallback, useRef, useState } from "react";

import "./App.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { useHotkeys } from "react-hotkeys-hook";
import { Mesh, PerspectiveCamera, Scene } from "three";

import sceneToSvg from "./util/svg/sceneToSvg";

type Vec3 = [number, number, number];

function Box({ position, onClick }: { position: Vec3; onClick: () => void }) {
  // This reference will give us direct access to the mesh
  const mesh = useRef<Mesh>(null);
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta;
    }
  });

  return (
    <mesh
      position={position}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={() => {
        onClick();
        setActive(!active);
      }}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

function App() {
  const scene = useRef<Scene>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const camera = useRef<PerspectiveCamera>(null);

  const save = useCallback(() => {
    if (!scene.current || !divRef.current || !camera.current) {
      return;
    }

    sceneToSvg({
      scene: scene.current,
      camera: camera.current,
      ignoreVisibility: false,
      size: { y: divRef.current.clientHeight, x: divRef.current.clientWidth },
    });
  }, []);

  useHotkeys("cmd+e", save, [scene]);
  return (
    <div className="App">
      <Suspense />
      <div ref={divRef}>
        <Canvas>
          <perspectiveCamera ref={camera} />
          <scene ref={scene}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Box position={[-1.2, 0, 0]} onClick={save} />
            <Box position={[1.2, 0, 0]} onClick={save} />
          </scene>
        </Canvas>
      </div>
    </div>
  );
}

export default App;
