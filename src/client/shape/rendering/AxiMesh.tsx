/* eslint-disable no-param-reassign */
import React, { ReactNode, useContext, useRef } from "react"

import { MeshProps } from "@react-three/fiber"

import { GroupContext } from "src/client/context/GroupContext"

import { AxiEdges } from "./AxiEdges"
import { V3 } from "../../types/V3"

export type AxiMeshProps = Partial<Omit<MeshProps, "position" | "scale" | "rotation">> & {
  children?: ReactNode
  position?: V3
  scale?: V3
  rotation?: V3
}

function AxiMesh({ children, position, scale, rotation, ...rest }: AxiMeshProps) {
  const ref = useRef()

  const { fillColor: color } = useContext(GroupContext)

  return (
    <mesh
      ref={ref}
      /**
       * position, rotation, scale all need to be converted to arrays because for some reason, passing them
       * as Vector3's converts them to some broken type [Vector3, Vector3, Vector3]
       */

      // eslint-disable-next-line react/no-unknown-property
      position={position?.toArray()}
      // eslint-disable-next-line react/no-unknown-property
      rotation={rotation?.toArray()}
      // eslint-disable-next-line react/no-unknown-property
      scale={scale?.toArray()}
      {...rest}>
      {children}

      <meshBasicMaterial color={color} />
      <AxiEdges />
    </mesh>
  )
}

export default AxiMesh
