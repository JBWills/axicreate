import React, { useCallback, useState } from "react"

import { InputSwitch } from "primereact/inputswitch"

import { useStyles } from "../../../hooks/useStyles"
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

  const styles = useStyles(
    () => ({
      axiInputSwitch: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        height: 30,
        marginTop: 10,
      },
      inputSwitch: {
        marginLeft: 8,
        height: 20,
        width: 43,
      },
    }),
    []
  )

  return (
    <div style={styles.axiInputSwitch}>
      <Label text={label} marginBottom={0} marginTop={0} />
      <InputSwitch
        style={styles.inputSwitch}
        checked={actualValue}
        onChange={handleChange}
      />
    </div>
  )
}

export default React.memo(AxiInputSwitch)
