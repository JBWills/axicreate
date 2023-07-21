import React, { useCallback } from "react"

import { useRecoilState } from "recoil"

import { BoundRectState } from "src/client/context/recoil/BoundRectState"
import { axiMemo } from "src/client/hooks/genericMemo"

import AxiSliderPair from "../inputs/AxiSliderPair"

interface BoundRectControlsProps {}

function BoundRectControls({}: BoundRectControlsProps) {
  const [boundRectState, setBoundRectState] = useRecoilState(BoundRectState)

  const handleChange = useCallback(
    (x: number, y: number) =>
      setBoundRectState((curr) => ({
        ...curr,
        left: x / 2,
        right: x / 2,
        top: y / 2,
        bottom: y / 2,
      })),
    [setBoundRectState]
  )

  return (
    <AxiSliderPair
      title="Bounds"
      onChange={handleChange}
      valueX={boundRectState.left * 2}
      valueY={boundRectState.top * 2}
    />
  )
}

export default axiMemo(BoundRectControls)
