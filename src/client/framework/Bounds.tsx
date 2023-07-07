import React from "react"

import { useRecoilValue } from "recoil"

import { axiMemo } from "src/client/hooks/genericMemo"
import { useStyles } from "src/client/hooks/useStyles"

import { BoundRectBoundsState } from "../context/recoil/BoundRectState"

interface BoundsProps {}

function Bounds({}: BoundsProps) {
  const boundsState = useRecoilValue(BoundRectBoundsState)
  const styles = useStyles((theme) => ({}), [])

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        background: "#ff000074",
      }}
    />
  )
}

export default axiMemo(Bounds)
