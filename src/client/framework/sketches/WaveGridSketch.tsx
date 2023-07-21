import React, { useMemo } from "react"

import { useRecoilValue } from "recoil"

import { Segment } from "src/client/types/Segment"
import { V2 } from "src/client/types/V2"
import { V3 } from "src/client/types/V3"
import { times } from "src/client/util/times"

import { SketchRenderData, createSketchState } from "../../context/recoil/util/createSketchState"
import AxiBox from "../../shape/AxiBox"
import AxiStateSlider from "../controls/inputs/recoilSliders/AxiStateSlider"
import AxiStateSliderPair from "../controls/inputs/recoilSliders/AxiStateSliderPair"

type WaveGridStateType = {
  gridXY: [number, number]
  distanceXY: [number, number]
  amplitude: number
  frequency: number
  offset: number
  evolution: number
}

function WaveGridSketchControls({ selectors }: SketchRenderData<WaveGridStateType>) {
  console.log(selectors.gridXY)
  return (
    <>
      <AxiStateSliderPair title="Boxes" state={selectors.gridXY} minMax={[1, 500]} step={1} />
      <AxiStateSliderPair
        title="Distance"
        state={selectors.distanceXY}
        minMax={[0, 10]}
        step={0.01}
      />

      <AxiStateSlider label="Amplitude" state={selectors.amplitude} minMax={[0, 10]} step={0.01} />
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
      <AxiStateSlider label="Evolution" state={selectors.evolution} minMax={[0, 100]} step={0.01} />
    </>
  )
}

function WaveGridSketch({ recoilState: WaveGridState }: SketchRenderData<WaveGridStateType>) {
  const waveGridState = useRecoilValue(WaveGridState)

  const boxOrigins = useMemo(() => {
    const gridXY = V2.from(waveGridState.gridXY)
    const totalWaveGridDist = V2.from(waveGridState.distanceXY).times(waveGridState.gridXY)
    const [start, end] = [totalWaveGridDist.times(-1).div(2), totalWaveGridDist.div(2)]

    const waveGridTrackLeft = new Segment(new V3(start.x, 0, start.y), new V3(start.x, 0, end.y))
    const waveGridTrackRight = new Segment(new V3(end.x, 0, start.y), new V3(end.x, 0, end.y))

    const boxes: V3[] = []
    times(gridXY.x, (xi) => {
      let percentX: number
      if (gridXY.x === 1) {
        percentX = 0.0
      } else {
        percentX = xi / (gridXY.x - 1)
      }

      times(gridXY.y, (yi) => {
        let percentY: number
        if (gridXY.y === 1) {
          percentY = 0.0
        } else {
          percentY = yi / (gridXY.y - 1)
        }
        const waveGridTrack = new Segment(
          waveGridTrackLeft.valueAtPercent(percentY),
          waveGridTrackRight.valueAtPercent(percentY)
        )

        const basePoint = waveGridTrack.valueAtPercent(percentX)
        const height =
          Math.sin(
            waveGridState.frequency * percentX * 2 * Math.PI +
              waveGridState.offset +
              percentY * waveGridState.evolution
          ) * waveGridState.amplitude

        const boxCenter = basePoint.withY(height)
        boxes.push(boxCenter)
      })
    })
    return boxes
  }, [waveGridState])

  return (
    <>
      {boxOrigins.map((box: V3, i: number) => (
        // eslint-disable-next-line react/no-array-index-key
        <AxiBox key={`Box_${i}`} position={box} />
      ))}
    </>
  )
}

export const WaveGridSketchState = createSketchState({
  sketchName: "WaveGrid",
  defaultValue: {
    gridXY: [10, 10],
    distanceXY: [1, 1],
    amplitude: 10,
    frequency: 1,
    offset: 0,
    evolution: 0,
  } satisfies WaveGridStateType,
  ControlsComponent: WaveGridSketchControls,
  SceneComponent: WaveGridSketch,
})
