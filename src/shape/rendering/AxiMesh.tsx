import { ReactNode, useContext } from "react"

import { MeshProps } from "@react-three/fiber"

import { AxiEdges } from "./AxiEdges"
import { GroupContext } from "../../context/GroupContext"

export interface AxiMeshProps extends Partial<MeshProps> {
  children?: ReactNode
}

export default function AxiMesh({ children, ...rest }: AxiMeshProps) {
  const { fillColor } = useContext(GroupContext)
  console.log({ fillColor })

  return (
    <mesh {...rest}>
      {children}

      <meshBasicMaterial color={fillColor} />
      <AxiEdges />
    </mesh>
  )
}
