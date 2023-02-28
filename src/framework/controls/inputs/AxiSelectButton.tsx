import React, { useCallback, useMemo } from "react"

import {
  SelectButton,
  SelectButtonChangeEvent,
  SelectButtonProps,
} from "primereact/selectbutton"
import type { SelectItem } from "primereact/selectitem"

import "./AxiSelectButton.css"

import Label from "../../components/Label"

type AxiSelectButtonProps<T extends string> = {
  label: string
  options: T[]
  value?: T
  onChange?: (e: T) => void
} & Pick<SelectButtonProps, "multiple" | "unselectable" | "disabled">

function AxiSelectButton<T extends string>({
  label,
  options,
  value,
  onChange,
  multiple,
  unselectable,
  disabled,
}: AxiSelectButtonProps<T>) {
  const handleChange = useCallback(
    (e: SelectButtonChangeEvent) => {
      onChange?.(e.value)
    },
    [onChange]
  )

  const optionsTyped: SelectItem[] = useMemo(
    () =>
      options.map((o) => ({
        type: o,
        value: o,
        className: "SelectButton",
      })),
    options
  )

  return (
    <div className="AxiSelectButton">
      <Label text={label} />
      <SelectButton
        onChange={handleChange}
        optionLabel="value"
        value={value}
        options={optionsTyped}
        multiple={multiple}
        unselectable={unselectable}
        disabled={disabled}
      />
    </div>
  )
}

export default React.memo(AxiSelectButton)
