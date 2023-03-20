import React, { ChangeEvent, useCallback } from "react"

import { InputText } from "primereact/inputtext"

import { useInputTextStyles } from "./base/useInputTextStyle"
import { useStyles } from "../../../hooks/useStyles"
import Label from "../../components/Label"

interface AxiInputProps {
  label: string
  placeholder?: string
  tooltip?: string
  onChange?: (s: string) => void
}

function AxiInputText({
  label,
  onChange,
  placeholder,
  tooltip,
}: AxiInputProps) {
  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value),
    [onChange]
  )

  const styles = useStyles(
    () => ({
      container: { width: "100%" },
    }),
    []
  )

  const inputTextStyle = useInputTextStyles()
  return (
    <div style={styles.container}>
      <Label text={label} />
      <InputText
        tooltip={tooltip}
        style={inputTextStyle}
        onChange={onChange && onChangeHandler}
        placeholder={placeholder}
      />
    </div>
  )
}

export default React.memo(AxiInputText)
