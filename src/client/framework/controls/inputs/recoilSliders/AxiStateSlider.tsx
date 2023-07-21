import React, { useCallback } from "react"

import { RecoilState, useRecoilState } from "recoil"

import { axiMemo } from "src/client/hooks/genericMemo"

import AxiSlider from "../AxiSlider"

interface AxiStateSliderProps {
  label: string
  state: RecoilState<number>
  minMax: [number, number]
  step: number
  onChange?: (n: number) => void
}

function AxiStateSlider({ label, state, minMax, step, onChange }: AxiStateSliderProps) {
  const [recoilState, setRecoilState] = useRecoilState(state)

  const handleChange = useCallback(
    (n: number) => {
      setRecoilState(n)
      onChange?.(n)
    },
    [onChange, setRecoilState]
  )

  return (
    <AxiSlider
      label={label}
      value={recoilState}
      type="single"
      minMax={minMax}
      step={step}
      onChange={handleChange}
    />
  )
}

export default axiMemo(AxiStateSlider)
