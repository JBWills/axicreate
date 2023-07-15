import React, { CSSProperties, useCallback } from "react"

import { InputNumber, InputNumberChangeEvent } from "primereact/inputnumber"

import { useInputTextStyles } from "./base/useInputTextStyle"
import { axiMemo } from "../../../hooks/genericMemo"
import { useStyles } from "../../../hooks/useStyles"
import Label from "../../components/Label"

interface AxiInputNumberProps {
  label?: string
  value?: number
  // labelDir defaults to "top"
  labelDir?: "top" | "left"
  maxWidth?: CSSProperties["maxWidth"]
  onChange?: (e: number) => void
  maxFractionDigits?: number
}

function AxiInputNumber({
  label,
  onChange,
  maxWidth,
  labelDir,
  value,
  maxFractionDigits,
}: AxiInputNumberProps) {
  const handleChange = useCallback(
    (e: InputNumberChangeEvent) => {
      if (e.value !== null) onChange?.(e.value)
    },
    [onChange]
  )

  const styles = useStyles(
    () => ({
      container: {
        width: "100%",
        maxWidth,
        ...(labelDir === "left" && {
          display: "flex",
          alignItems: "center",
        }),
      },
    }),
    [maxWidth, labelDir]
  )

  const inputTextStyle = useInputTextStyles()

  return (
    <div style={styles.container}>
      {label && <Label text={label} marginRight={5} marginTop={0} marginBottom={0} />}
      <InputNumber
        inputStyle={inputTextStyle}
        onChange={handleChange}
        maxFractionDigits={maxFractionDigits ?? 6}
        value={value}
      />
    </div>
  )
}

export default axiMemo(AxiInputNumber)
