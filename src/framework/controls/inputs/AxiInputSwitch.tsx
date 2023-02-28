import React, { useCallback, useState } from "react"

import { InputSwitch } from "primereact/inputswitch"

import Label from "../../components/Label"

import "./AxiInputSwitch.css"

interface AxiInputSwitchProps {
  label: string
  value?: boolean
  defaultValue?: boolean
  onChange?: (e: boolean) => void
}

function AxiInputSwitch({
  defaultValue,
  label,
  onChange,
  value,
}: AxiInputSwitchProps) {
  const [localChecked, setLocalChecked] = useState(defaultValue ?? false)
  const actualValue = value ?? localChecked
  const handleChange = useCallback(() => {
    const newChecked = !actualValue
    setLocalChecked(newChecked)
    onChange?.(newChecked)
  }, [onChange, setLocalChecked, actualValue])

  return (
    <div className="AxiInputSwitch">
      <Label text={label} marginBottom={0} marginTop={0} />
      <InputSwitch
        className="InputSwitch"
        checked={actualValue}
        onChange={handleChange}
      />
    </div>
  )
}

export default React.memo(AxiInputSwitch)
