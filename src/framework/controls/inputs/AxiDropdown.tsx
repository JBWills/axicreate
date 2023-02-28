import React, { useCallback, useMemo, useState } from "react"

import { Dropdown, DropdownChangeEvent } from "primereact/dropdown"

import "./AxiDropdown.css"

import { SelectOption } from "../../../types/SelectOption"
import { regularText } from "../../../util/typography"
import Label from "../../components/Label"

interface AxiDropdownProps<T> {
  label: string
  value?: T
  options: SelectOption<T>[]
  onChange?: (e: T) => void
}

const optionLabel: keyof SelectOption<any> = "displayName"
const optionValue: keyof SelectOption<any> = "value"

function AxiDropdown<T>({
  label,
  onChange,
  options,
  value,
}: AxiDropdownProps<T>) {
  const [local, setLocal] = useState(value ?? undefined)
  const handleChange = useCallback(
    (e: DropdownChangeEvent) => {
      const v = e.value as T
      setLocal(v ?? undefined)
      onChange?.(v)
    },
    [onChange]
  )

  const styledOptions = useMemo(() => {
    return options.map((option) => ({
      ...option,
      className: "DropdownOptionWrapper",
    }))
  }, [options])

  const renderOption = useCallback(
    (v: SelectOption<T> | undefined) => (
      <div className="DropdownOption" style={regularText}>
        {v?.displayName}
      </div>
    ),
    []
  )

  const actualValue = value ?? local

  return (
    <div className="AxiDropdown">
      <Label text={label} />
      <Dropdown
        className="Dropdown"
        style={regularText}
        onChange={handleChange}
        value={actualValue}
        options={styledOptions}
        optionLabel={optionLabel}
        optionValue={optionValue}
        itemTemplate={renderOption}
        valueTemplate={renderOption}
      />
    </div>
  )
}

export default React.memo(AxiDropdown)
