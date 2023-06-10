import React, { useContext } from "react"

import { Line } from "@react-three/drei"

import { axiMemo } from "src/client/hooks/genericMemo"

import AxiMesh from "./rendering/AxiMesh"
import { GroupContext } from "../context/GroupContext"
import { Polyline } from "../types/Polyline"

interface AxiLineProps {
  polyline: Polyline
}

function AxiLine({ polyline }: AxiLineProps) {
  const { strokeColor: color } = useContext(GroupContext)
  return (
    <AxiMesh skipEdges>
      <Line points={polyline.map((it) => it.toArray())} lineWidth={3} color={color} />
    </AxiMesh>
  )
}

export default axiMemo(AxiLine)
