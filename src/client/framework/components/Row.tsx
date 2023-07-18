import React, { CSSProperties } from "react"

import { axiMemo } from "src/client/hooks/genericMemo"
import { useStyles } from "src/client/hooks/useStyles"

interface RowProps {
  children: React.ReactNode
  gap?: 8 | 16 | 24 | 32
  style?: CSSProperties
}

function Row({ style, gap = 8, children }: RowProps) {
  const styles = useStyles(
    () => ({
      row: {
        display: "flex",
        flexDirection: "row",
        gap,
        justifyContent: "stretch",
        ...style,
      },
    }),
    [gap, style]
  )

  return <div style={styles.row}>{children}</div>
}

export default axiMemo(Row)
