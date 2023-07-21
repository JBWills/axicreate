import React, { useCallback } from "react"

import { RecoilState, useRecoilState } from "recoil"

import { axiMemo } from "src/client/hooks/genericMemo"

import { V2 } from "../../../../types/V2"
import AxiSliderPair from "../AxiSliderPair"

interface AxiStateSliderProps {
  title: string
  state: RecoilState<[number, number]>
  step: number | [number, number]
  labelX?: string
  labelY?: string
  minMax?: [number, number]
  yMinMax?: [number, number]
  onChange?: (v: [number, number]) => void
}

function AxiStateSlider({
  state,
  minMax,
  yMinMax,
  step,
  onChange,
  labelX,
  labelY,
  title,
}: AxiStateSliderProps) {
  const [recoilState, setRecoilState] = useRecoilState(state)

  const v2Val = V2.from(recoilState)

  const { x, y } = v2Val

  const handleChange = useCallback(
    (n: number, n2: number) => {
      setRecoilState([n, n2])
      onChange?.([n, n2])
    },
    [onChange, setRecoilState]
  )

  return (
    <AxiSliderPair
      title={title}
      labelX={labelX}
      labelY={labelY}
      valueX={x}
      valueY={y}
      minMax={minMax}
      yMinMax={yMinMax}
      step={step}
      onChange={handleChange}
    />
  )
}

export default axiMemo(AxiStateSlider)
