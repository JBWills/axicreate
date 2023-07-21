import React, { useMemo } from "react"

import { useRecoilValue } from "recoil"

import { axiMemo } from "src/client/hooks/genericMemo"
import AxiLine from "src/client/shape/AxiLine"
import { Segment } from "src/client/types/Segment"
import { V3 } from "src/client/types/V3"
import { times } from "src/client/util/times"

import { SketchRenderData, createSketchState } from "../../context/recoil/util/createSketchState"
import AxiBox from "../../shape/AxiBox"
import AxiStateSlider from "../controls/inputs/recoilSliders/AxiStateSlider"

export type WaveStateType = {
  numWaves: number
  distance: number
  length: number
  amplitude: number
  frequency: number
  step: number
  offset: number
  evolution: number
}

export const WaveSketchState = createSketchState({
  sketchName: "Wave",
  ControlsComponent: WaveSketchControls,
  SceneComponent: WaveSketch,
  defaultValue: {
    numWaves: 3,
    distance: 0.5,
    length: 3,
    amplitude: 1,
    frequency: 0.2,
    step: 0.2,
    offset: 0.0,
    evolution: 0.0,
  } satisfies WaveStateType,
})

export function WaveSketchControls({ selectors }: SketchRenderData<WaveStateType>) {
  return (
    <>
      <AxiStateSlider
        label="Number of waves"
        state={selectors.numWaves}
        minMax={[1, 50]}
        step={1}
      />
      <AxiStateSlider label="Distance" state={selectors.distance} minMax={[0, 10]} step={0.01} />
      <AxiStateSlider label="Length" state={selectors.length} minMax={[0.5, 200]} step={0.01} />
      <AxiStateSlider label="Amplitude" state={selectors.amplitude} minMax={[0, 6]} step={0.01} />
      <AxiStateSlider
        label="Frequency"
        state={selectors.frequency}
        minMax={[0.01, 200]}
        step={0.01}
      />
      <AxiStateSlider
        label="Offset"
        state={selectors.offset}
        minMax={[0, 2 * Math.PI]}
        step={0.1}
      />
      <AxiStateSlider label="Step" state={selectors.step} minMax={[0.01, 1]} step={0.01} />
      <AxiStateSlider label="Evolution" state={selectors.evolution} minMax={[0, 100]} step={0.01} />
    </>
  )
}

function WaveSketch({ recoilState: WaveState }: SketchRenderData<WaveStateType>) {
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
        <>
          <AxiLine polyline={wave} />
          <AxiBox position={wave[0]} />
        </>
      ))}
    </>
  )
}

export default axiMemo(WaveSketch)
