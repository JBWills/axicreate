import React from "react"

import { axiMemo } from "../../hooks/genericMemo"
import { useStyles } from "../../hooks/useStyles"

interface LabelProps {
  text: string
  marginTop?: number
  marginBottom?: number
  marginLeft?: number
  marginRight?: number
}

function Label({ text, marginTop, marginBottom, marginLeft, marginRight }: LabelProps) {
  const styles = useStyles(
    () => ({
      labelText: {
        marginTop: marginTop ?? 20,
        marginBottom: marginBottom ?? 4,
        marginLeft,
        marginRight,
      },
    }),
    [marginTop, marginBottom, marginLeft, marginRight]
  )
  return <h5 style={styles.labelText}>{text}</h5>
}

export default axiMemo(Label)
