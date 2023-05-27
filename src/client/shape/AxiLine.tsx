import React, { useMemo } from "react"

import { Line } from "@react-three/drei"
import THREE, { BufferAttribute, BufferGeometry } from "three"

import { axiMemo } from "src/client/hooks/genericMemo"

import AxiMesh from "./rendering/AxiMesh"
import { Polyline } from "../types/Polyline"

interface AxiLineProps {
  polyline: Polyline
}

function AxiLine({ polyline }: AxiLineProps) {
  const bufferGeom = useMemo(() => {
    const points3D = new BufferGeometry()
    points3D.setAttribute(
      "position",
      new BufferAttribute(
        new Float32Array(polyline.flatMap((it) => [it.x, it.y, it.z])),
        polyline.length * 3
      )
    )
    return points3D
  }, [polyline])
  return (
    <>
      {/* <AxiMesh skipEdges>
        {/* eslint-disable-next-line react/no-unknown-property
        <lineSegments geometry={bufferGeom} />
      </AxiMesh> */}

      <AxiMesh skipEdges>
        {/* eslint-disable-next-line react/no-unknown-property */}
        <Line
          points={polyline.map((it) => it.toArray())}
          lineWidth={3}
          color={new THREE.Color("#FFFFFF")}
        />
      </AxiMesh>
    </>
  )
}

export default axiMemo(AxiLine)
