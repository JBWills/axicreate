import React, { useCallback, useMemo, useRef } from "react"

import Draggable, { DraggableEventHandler } from "react-draggable"

import Handle from "./base/Handle"
import XYCoordInputs from "./XYCoordInputs"
import { axiMemo } from "../../../hooks/genericMemo"
import { useStyles } from "../../../hooks/useStyles"
import { V2 } from "../../../types/V2"
import Label from "../../components/Label"

interface Slider2dProps {
  value: V2 | undefined
  min: V2
  max: V2
  onChange?: (v: V2) => void
}

const gridSizeMax = 300
const gridSizeBase = 200
const gridSizeMin = 100

const handleSize = 20

function Slider2D({ value, min, max, onChange }: Slider2dProps) {
  const ref = useRef<HTMLDivElement>(null)

  const gridSize = getGridSize({ min, max })

  const gridWidth = gridSize.x
  const gridHeight = gridSize.y

  const top = -handleSize / 2
  const bottom = top + gridHeight
  const left = -handleSize / 2
  const right = left + gridWidth

  const minBound = useMemo(() => new V2(left, top), [left, top])
  const maxBound = useMemo(() => new V2(right, bottom), [right, bottom])

  const screenToValue = useCallback(
    (v: V2) =>
      v.mapped({
        from: [minBound, maxBound],
        to: [min, max],
      }),
    [min, max, minBound, maxBound]
  )

  const valueToScreen = useCallback(
    (v: V2) =>
      v.mapped({
        from: [min, max],
        to: [minBound, maxBound],
      }),
    [min, max, minBound, maxBound]
  )

  const handleDrag: DraggableEventHandler = useCallback(
    (e, data) => {
      const newValue = screenToValue(V2.from(data))
      onChange?.(newValue)
    },
    [onChange, screenToValue]
  )

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const { left: parentLeft, top: parentTop } =
        e.currentTarget.getBoundingClientRect()

      const newValue = screenToValue(
        new V2(
          e.clientX - parentLeft - handleSize / 2,
          e.clientY - parentTop - handleSize / 2
        )
      )
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

  const styles = useStyles(
    () => ({
      gridContainer: {
        position: "relative",
        paddingTop: 20,
        paddingBottom: 20,
      },
      grid: {
        background: "lightblue",
        width: gridWidth,
        height: gridHeight,
        position: "relative",
      },
      gridInputs: {
        display: "flex",
        alignItems: "center",
        width: gridWidth,
        marginTop: 20,
      },
    }),
    [gridWidth, gridHeight]
  )

  return (
    <>
      <div style={styles.gridContainer}>
        <div ref={ref} style={styles.grid} onMouseDown={handleClick}>
          <Draggable
            bounds={bounds}
            position={value !== undefined ? valueToScreen(value) : undefined}
            onDrag={handleDrag}>
            <div>
              <Handle onClick={handleClickOnDragHandle} />
            </div>
          </Draggable>
        </div>

        <GridLabel vec={min} vertical="top" horizontal="left" />
        <GridLabel vec={max} vertical="bottom" horizontal="right" />
        <GridLabel
          vec={V2.from(min.x, max.y)}
          vertical="bottom"
          horizontal="left"
        />
        <GridLabel
          vec={V2.from(max.x, min.y)}
          vertical="top"
          horizontal="right"
        />
      </div>
      <div style={styles.gridInputs}>
        <XYCoordInputs value={value} min={min} onChange={onChange} />
      </div>
    </>
  )
}

function getGridSize({ min, max }: { min: V2; max: V2 }): V2 {
  const aspect = (max.x - min.x) / (max.y - min.y)

  const gridWidth = gridSizeBase * aspect
  const gridHeight = gridSizeBase * (1 / aspect)

  const gridSize = new V2(gridWidth, gridHeight)

  return gridSize.clamp([gridSizeMin, gridSizeMax])
}

function GridLabel({
  vec,
  vertical,
  horizontal,
}: {
  vec: V2
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
      <Label text={vec.toString()} />
    </div>
  )
}

export default axiMemo(Slider2D)
