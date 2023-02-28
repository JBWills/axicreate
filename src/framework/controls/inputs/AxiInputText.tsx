import React, { ChangeEvent, useCallback } from "react"

import { InputText } from "primereact/inputtext"

import "./AxiInputText.css"
import { regularText } from "../../../util/typography"
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
  return (
    <div className="AxiInputText">
      <Label text={label} />
      <InputText
        className="InputText"
        tooltip={tooltip}
        style={regularText}
        onChange={onChange && onChangeHandler}
        placeholder={placeholder}
      />
    </div>
  )
}

export default React.memo(AxiInputText)
