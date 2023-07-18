import React, { CSSProperties } from "react"

import { axiMemo } from "src/client/hooks/genericMemo"
import { useStyles } from "src/client/hooks/useStyles"

interface ColProps {
  children: React.ReactNode
  gap?: 8 | 16 | 24 | 32
  style?: CSSProperties
}

function Col({ style, gap, children }: ColProps) {
  const styles = useStyles(
    (theme) => ({
      column: {
        display: "flex",
        flexDirection: "column",
        gap,
        ...style,
      },
    }),
    [gap, style]
  )

  return <div style={styles.column}>{children}</div>
}

export default axiMemo(Col)
