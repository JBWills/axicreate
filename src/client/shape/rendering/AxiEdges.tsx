import { useContext } from "react"

import { Edges } from "@react-three/drei"

import { GroupContext } from "../../context/GroupContext"

export function AxiEdges() {
  const { strokeColor: color } = useContext(GroupContext)
  return <Edges threshold={1} color={color} />
}
