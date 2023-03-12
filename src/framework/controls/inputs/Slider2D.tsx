import React, { useCallback, useMemo, useRef } from "react"

import Draggable, { DraggableEventHandler } from "react-draggable"

import Handle from "./base/Handle"
import XYCoordInputs from "./XYCoordInputs"
import { useMemoArray } from "../../../hooks/useMemoArray"
import { useStyles } from "../../../hooks/useStyles"
import { Vec2, formatVec2, getX, getY } from "../../../types/Vec2"
import "./Slider2D.css"
import { clampVec2 } from "../../../util/clamp"
import { vec2Mapped } from "../../../util/percentAlong"
import vecString from "../../../util/vecString"
import Label from "../../components/Label"

interface Slider2dProps {
  value: Vec2 | undefined
  min: Vec2
  max: Vec2
  onChange?: (v: Vec2) => void
}

const gridSizeMax = 300
const gridSizeBase = 200
const gridSizeMin = 100

const handleSize = 20

function Slider2D({ value, min, max, onChange }: Slider2dProps) {
  const ref = useRef<HTMLDivElement>(null)

  const gridSize = getGridSize({ min, max })

  const gridWidth = getX(gridSize)
  const gridHeight = getY(gridSize)

  const top = -handleSize / 2
  const bottom = top + gridHeight
  const left = -handleSize / 2
  const right = left + gridWidth

  const minBound: [number, number] = useMemoArray([left, top])
  const maxBound: [number, number] = useMemoArray([right, bottom])

  const screenToValue = useCallback(
    (v: Vec2) =>
      vec2Mapped({
        num: v,
        from: [minBound, maxBound],
        to: [min, max],
      }),
    [min, max, minBound, maxBound]
  )

  const valueToScreen = useCallback(
    (v: Vec2) =>
      vec2Mapped({
        num: v,
        from: [min, max],
        to: [minBound, maxBound],
      }),
    [min, max, minBound, maxBound]
  )

  const handleDrag: DraggableEventHandler = useCallback(
    (e, data) => {
      console.log("handleDrag")
      const newValue = screenToValue(data)
      onChange?.(newValue)
    },
    [onChange, screenToValue]
  )

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      console.log("handleClick")
      const { left: parentLeft, top: parentTop } =
        e.currentTarget.getBoundingClientRect()
      const newValue = screenToValue([
        e.clientX - parentLeft - handleSize / 2,
        e.clientY - parentTop - handleSize / 2,
      ])
      onChange?.(newValue)
    },
    [onChange, screenToValue]
  )

  const handleClickOnDragHandle = useCallback((e: React.MouseEvent) => {
    console.log("Fake click")
    e.stopPropagation()
  }, [])

  const bounds = useMemo(() => {
    return { top, bottom, left, right }
  }, [top, bottom, left, right])

  return (
    <>
      <div style={{ position: "relative", paddingTop: 20, paddingBottom: 20 }}>
        <div
          ref={ref}
          style={{
            background: "lightblue",
            width: gridWidth,
            height: gridHeight,
            position: "relative",
          }}
          onMouseDown={handleClick}>
          <Draggable
            bounds={bounds}
            position={
              value !== undefined ? formatVec2(valueToScreen(value)) : undefined
            }
            onDrag={handleDrag}>
            <div>
              <Handle onClick={handleClickOnDragHandle} />
            </div>
          </Draggable>
        </div>

        <GridLabel vec={min} vertical="top" horizontal="left" />
        <GridLabel vec={max} vertical="bottom" horizontal="right" />
        <GridLabel
          vec={[getX(min), getY(max)]}
          vertical="bottom"
          horizontal="left"
        />
        <GridLabel
          vec={[getX(max), getY(min)]}
          vertical="top"
          horizontal="right"
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: gridWidth,
          marginTop: 20,
        }}>
        <XYCoordInputs value={value} min={min} onChange={onChange} />
      </div>
    </>
  )
}

function getGridSize({ min, max }: { min: Vec2; max: Vec2 }): Vec2 {
  const aspect = (getX(max) - getX(min)) / (getY(max) - getY(min))

  const gridWidth = gridSizeBase * aspect
  const gridHeight = gridSizeBase * (1 / aspect)

  return clampVec2([gridWidth, gridHeight], [gridSizeMin, gridSizeMax])
}

function GridLabel({
  vec,
  vertical,
  horizontal,
}: {
  vec: Vec2
  vertical: "top" | "bottom"
  horizontal: "left" | "right" | "center"
}) {
  const styles = useStyles(
    () => ({
      container: {
        zIndex: -1,
        position: "absolute",
        ...(vertical === "top" ? { top: -20 } : { bottom: -5 }),
        ...(horizontal === "left" ? { left: -10 } : { right: -10 }),
      },
    }),
    [vertical, horizontal]
  )
  return (
    <div style={styles.container}>
      <Label text={vecString(vec)} />
    </div>
  )
}

export default React.memo(Slider2D)
