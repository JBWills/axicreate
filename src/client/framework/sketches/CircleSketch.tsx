import React, { useMemo } from "react"

import { useRecoilValue } from "recoil"

import { axiMemo } from "src/client/hooks/genericMemo"
import AxiLine from "src/client/shape/AxiLine"
import { Deg } from "src/client/types/Deg"
import { Polyline } from "src/client/types/Polyline"
import { V3 } from "src/client/types/V3"
import { times } from "src/client/util/times"

import { SketchRenderData, createSketchState } from "../../context/recoil/util/createSketchState"
import AxiStateSlider from "../controls/inputs/recoilSliders/AxiStateSlider"

export type CircleStateType = {
  numCircles: number
  size: number
  sizeMin: number
  linesPerCircle: number
  lineDist: number
  angle: Deg
}

export const CircleSketchState = createSketchState({
  sketchName: "Circle",
  ControlsComponent: CircleSketchControls,
  SceneComponent: CircleSketch,
  defaultValue: {
    numCircles: 6,
    size: 30,
    sizeMin: 1,
    linesPerCircle: 30,
    lineDist: 0.5,
    angle: Deg.from(0),
  } satisfies CircleStateType,
  serializer: {
    toJson: (data) =>
      JSON.stringify({
        ...data,
        angle: data.angle.degrees,
      }),
    fromJson: (json) => {
      const data = JSON.parse(json)
      return {
        ...data,
        angle: Deg.from(data.angle),
      }
    },
  },
})

export function CircleSketchControls({ selectors }: SketchRenderData<CircleStateType>) {
  return (
    <>
      <AxiStateSlider
        label="Number of Circles"
        state={selectors.numCircles}
        minMax={[1, 50]}
        step={1}
      />

      <AxiStateSlider label="Size" state={selectors.size} minMax={[0, 30]} step={0.01} />
      <AxiStateSlider label="Size" state={selectors.sizeMin} minMax={[0, 30]} step={0.01} />
      <AxiStateSlider
        label="Length"
        state={selectors.linesPerCircle}
        minMax={[0.5, 200]}
        step={0.01}
      />
      <AxiStateSlider
        label="linesPerCircle"
        state={selectors.numCircles}
        minMax={[1, 100]}
        step={1}
      />
      <AxiStateSlider label="LineDist" state={selectors.lineDist} minMax={[0, 6]} step={0.01} />
    </>
  )
}

function CircleSketch({ recoilState: CircleState }: SketchRenderData<CircleStateType>) {
  const circleState = useRecoilValue(CircleState)

  const circles = useMemo(() => {
    const paths: Polyline[] = []
    times(circleState.numCircles, (i) => {
      const path = []
      const percent = circleState.numCircles === 1 ? 0 : i / (circleState.numCircles - 1)
      const size = circleState.size + (circleState.sizeMin - circleState.size) * percent
      for (let d = 0; d <= 360; d += 1) {
        const angle = Deg.from(d)
        const point = new V3(Math.cos(angle.rad) * size, 0, Math.sin(angle.rad) * size)
        path.push(point)
      }

      paths.push(path)
    })

    return paths
  }, [circleState])

  return (
    <>
      {circles.map((circle) => (
        <AxiLine polyline={circle} />
      ))}
    </>
  )
}

export default axiMemo(CircleSketch)
