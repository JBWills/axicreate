import React, { useMemo } from "react"

import { atom, useRecoilValue } from "recoil"

import { axiMemo } from "src/client/hooks/genericMemo"
import AxiLine from "src/client/shape/AxiLine"
import { Segment } from "src/client/types/Segment"
import { V3 } from "src/client/types/V3"
import { times } from "src/client/util/times"

import { useSetSubRecoilState } from "../../context/recoil/hooks/useSubRecoilState"
import AxiSlider from "../controls/inputs/AxiSlider"

export const WaveState = atom({
  key: "WaveState",
  default: {
    numWaves: 3,
    distance: 0.5,
    length: 3,
    amplitude: 1,
    frequency: 0.2,
    step: 0.2,
    offset: 0.0,
    evolution: 0.0,
  },
})

export function WaveSceneControls() {
  const waveState = useRecoilValue(WaveState)
  const numWavesHandleChange = useSetSubRecoilState(WaveState, "numWaves")
  const distanceHandleChange = useSetSubRecoilState(WaveState, "distance")
  const lengthHandleChange = useSetSubRecoilState(WaveState, "length")
  const amplitudeHandleChange = useSetSubRecoilState(WaveState, "amplitude")
  const frequencyHandleChange = useSetSubRecoilState(WaveState, "frequency")
  const offsetHandleChange = useSetSubRecoilState(WaveState, "offset")
  const stepHandleChange = useSetSubRecoilState(WaveState, "step")
  const evolutionHandleChange = useSetSubRecoilState(WaveState, "evolution")

  return (
    <>
      <AxiSlider
        label="Number of waves"
        value={waveState.numWaves}
        type="single"
        min={1}
        max={50}
        step={1}
        onChange={numWavesHandleChange}
      />
      <AxiSlider
        label="Distance"
        value={waveState.distance}
        type="single"
        min={0}
        max={10}
        step={0.01}
        onChange={distanceHandleChange}
      />
      <AxiSlider
        label="Length"
        value={waveState.length}
        type="single"
        min={0.5}
        max={200}
        step={0.01}
        onChange={lengthHandleChange}
      />
      <AxiSlider
        label="Amplitude"
        value={waveState.amplitude}
        type="single"
        min={0}
        max={6}
        step={0.01}
        onChange={amplitudeHandleChange}
      />
      <AxiSlider
        label="Frequency"
        value={waveState.frequency}
        type="single"
        min={0.01}
        max={200}
        step={0.01}
        onChange={frequencyHandleChange}
      />
      <AxiSlider
        label="Offset"
        value={waveState.offset}
        type="single"
        min={0}
        max={2 * Math.PI}
        step={0.1}
        onChange={offsetHandleChange}
      />
      <AxiSlider
        label="Step"
        value={waveState.step}
        type="single"
        min={0.01}
        max={1}
        step={0.01}
        onChange={stepHandleChange}
      />
      <AxiSlider
        label="Evolution"
        value={waveState.evolution}
        type="single"
        min={0}
        max={100}
        step={0.01}
        onChange={evolutionHandleChange}
      />
    </>
  )
}

interface WaveSceneProps {}

function WaveScene({}: WaveSceneProps) {
  const waveState = useRecoilValue(WaveState)

  const waves = useMemo(() => {
    const totalWaveDist = waveState.distance * waveState.numWaves

    const startX = -waveState.length / 2
    const endX = waveState.length / 2

    const startZ = -totalWaveDist / 2
    const endZ = totalWaveDist / 2

    const waveTrackLeft = new Segment(new V3(startX, 0, startZ), new V3(startX, 0, endZ))
    const waveTrackRight = new Segment(new V3(endX, 0, startZ), new V3(endX, 0, endZ))

    const paths: V3[][] = []
    times(waveState.numWaves, (i) => {
      let percent: number
      if (waveState.numWaves === 1) {
        percent = 0.0
      } else {
        percent = i / (waveState.numWaves - 1)
      }

      const waveTrack = new Segment(
        waveTrackLeft.valueAtPercent(percent),
        waveTrackRight.valueAtPercent(percent)
      )

      const stepPercent = (waveState.step || 1) / waveTrack.length

      const points = []
      for (let wavePercent = 0; wavePercent <= 1.0; wavePercent += stepPercent) {
        const basePoint = waveTrack.valueAtPercent(wavePercent)

        const height =
          Math.sin(
            waveState.frequency * wavePercent * 2 * Math.PI +
              waveState.offset +
              percent * waveState.evolution
          ) * waveState.amplitude

        points.push(basePoint.withY(height))
      }

      paths.push(points)
    })

    return paths
  }, [waveState])

  return (
    <>
      {waves.map((wave) => (
        <AxiLine polyline={wave} />
      ))}
    </>
  )
}

export default axiMemo(WaveScene)
