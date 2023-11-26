/* eslint-disable react/destructuring-assignment */
import React, { useCallback } from "react"

import { RecoilState, useRecoilState } from "recoil"

import { axiMemo } from "src/client/hooks/genericMemo"
import { Deg } from "src/client/types/Deg"
import unreachable from "src/client/util/unreachable"

import AxiSlider from "../AxiSlider"

type BaseSliderProps<T> = {
  type?: undefined | "deg"
  label: string
  state: RecoilState<T>
  minMax: [T | number, T | number]
  step: T | number
  onChange?: (n: T) => void
}

type NumberSliderProps = BaseSliderProps<number> & {
  type?: undefined
}

type DegSliderProps = BaseSliderProps<Deg> & {
  type: "deg"
}

type AxiStateSliderProps = NumberSliderProps | DegSliderProps

function AxiStateSlider(props: AxiStateSliderProps) {
  const numberMinMax: [number, number] = [
    maybeConvert(props.minMax[0]),
    maybeConvert(props.minMax[1]),
  ]
  const [recoilState, setRecoilState] = useRecoilState(
    props.state satisfies RecoilState<number> | RecoilState<Deg> as RecoilState<number | Deg>
  )
  const numberValue = maybeConvert(recoilState)

  const handleChange = useCallback(
    (n: number) => {
      if (props.type === "deg") {
        const newValue = new Deg(n)
        setRecoilState(newValue)
        props.onChange?.(newValue)
      } else if (props.type === undefined) {
        setRecoilState(n)
        props.onChange?.(n)
      } else {
        unreachable(props)
      }
    },
    [props, setRecoilState]
  )

  return (
    <AxiSlider
      label={props.label}
      value={numberValue}
      type="single"
      minMax={numberMinMax}
      step={maybeConvert(props.step)}
      onChange={handleChange}
    />
  )
}

function maybeConvert(n: Deg | number): number {
  return typeof n === "number" ? n : n.degrees ?? n
}

export default axiMemo(AxiStateSlider)
