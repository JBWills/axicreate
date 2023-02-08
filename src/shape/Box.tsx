import { useRef, useState } from "react"

import { useFrame } from "@react-three/fiber"
import { Mesh } from "three"

import { Vec3, toVector3 } from "../types/Vec3"

export default function Box({
  position,
  scale,
  onClick,
}: {
  position?: Vec3
  scale?: Vec3
  onClick?: () => void
}) {
  // This reference will give us direct access to the mesh
  const mesh = useRef<Mesh>(null)
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta
    }
  })

  return (
    <mesh
      // eslint-disable-next-line react/no-unknown-property
      position={toVector3(position)}
      ref={mesh}
      scale={toVector3(scale)}
      onClick={() => {
        onClick?.()
        setActive(!active)
      }}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  )
}
