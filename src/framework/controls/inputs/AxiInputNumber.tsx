import React, { CSSProperties, useCallback, useMemo } from "react"

import { InputNumber, InputNumberChangeEvent } from "primereact/inputnumber"

import "./AxiInputNumber.css"
import "./AxiInputText.css"
import { regularText } from "../../../util/typography"
import Label from "../../components/Label"

interface AxiInputNumberProps {
  label?: string
  value?: number
  // labelDir defaults to "top"
  labelDir?: "top" | "left"
  maxWidth?: CSSProperties["maxWidth"]
  onChange?: (e: number) => void
}

function AxiInputNumber({
  label,
  onChange,
  maxWidth,
  labelDir,
  value,
}: AxiInputNumberProps) {
  const handleChange = useCallback(
    (e: InputNumberChangeEvent) => {
      console.log("input is changing things")
      if (e.value !== null) onChange?.(e.value)
    },
    [onChange]
  )

  const style = useMemo(
    () => ({
      maxWidth,
      ...(labelDir === "left" && {
        display: "flex",
        alignItems: "center",
        marginLeft: 5,
        marginRight: 5,
      }),
    }),
    [maxWidth, labelDir]
  )

  return (
    <div className="AxiInputNumber" style={style}>
      {label && (
        <Label text={label} marginRight={5} marginTop={0} marginBottom={0} />
      )}
      <InputNumber
        inputClassName="InputText"
        style={regularText}
        onChange={handleChange}
        maxFractionDigits={6}
        value={value}
      />
    </div>
  )
}

export default React.memo(AxiInputNumber)
