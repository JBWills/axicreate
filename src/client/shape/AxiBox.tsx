import AxiMesh from "./rendering/AxiMesh"
import { V3 } from "../types/V3"
import { Ones } from "../util/constants/AxiArrays"

export default function AxiBox({
  position,
  scale,
  rotation,
}: {
  position?: V3
  scale?: V3
  rotation?: V3
}) {
  return (
    <AxiMesh position={position} scale={scale} rotation={rotation}>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <boxGeometry args={Ones} />
    </AxiMesh>
  )
}
