import React, { useCallback, useMemo, useState } from "react"

import { Dropdown, DropdownChangeEvent } from "primereact/dropdown"

import "./AxiDropdown.css"

import { axiMemo } from "../../../hooks/genericMemo"
import { useStyles } from "../../../hooks/useStyles"
import { SelectOption } from "../../../types/SelectOption"
import { regularText } from "../../../util/typography"
import Label from "../../components/Label"

interface AxiDropdownProps<T> {
  label: string
  value?: T
  options: SelectOption<T>[]
  onChange?: (e: T) => void
}

const optionLabel: keyof SelectOption<unknown> = "displayName"
const optionValue: keyof SelectOption<unknown> = "value"

function AxiDropdown<T extends unknown>({
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

  const styles = useStyles(
    () => ({
      dropdownOption: {
        padding: "5px 10px",
        ...regularText,
      },
      axiDropdown: {
        width: "100%",
      },
      dropdown: {
        width: "100%",
        minHeight: 35,
        padding: 0,
        marginBottom: 5,
        ...regularText,
      },
    }),
    []
  )

  const renderOption = useCallback(
    (v: SelectOption<T> | undefined) => (
      <div style={styles.dropdownOption}>{v?.displayName}</div>
    ),
    [styles.dropdownOption]
  )

  const actualValue = value ?? local

  return (
    <div style={styles.axiDropdown}>
      <Label text={label} />
      <Dropdown
        style={styles.dropdown}
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

export default axiMemo(AxiDropdown)
