import { Euler } from "@react-three/fiber"

import AxiMesh from "./rendering/AxiMesh"
import { V3 } from "../types/V3"

export default function AxiBox({
  position,
  scale,
  rotation,
}: {
  position?: V3
  scale?: V3
  rotation?: Euler
}) {
  return (
    <AxiMesh
      position={position?.toVector3()}
      scale={scale?.toVector3()}
      rotation={rotation}>
      {/* <meshBasicMaterial color="white" /> */}
      {/* eslint-disable-next-line react/no-unknown-property */}
      <boxGeometry args={[1, 1, 1]} />
    </AxiMesh>
  )
}
