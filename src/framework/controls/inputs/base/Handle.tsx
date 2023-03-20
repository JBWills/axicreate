import React from "react"

import { useStyles } from "../../../../hooks/useStyles"
import { DragProps } from "../../../../types/DragProps"
import { MouseProps } from "../../../../types/MouseProps"

interface HandleProps extends DragProps, MouseProps {
  size?: number
}

const DefaultSize = 20

function Handle({ size, ...rest }: HandleProps) {
  const styles = useStyles(
    () => ({
      handle: {
        width: size ?? DefaultSize,
        height: size ?? DefaultSize,
        cursor: "grab",
        backgroundColor: "blue",
        borderRadius: 100,
      },
    }),
    [size]
  )

  return <div style={styles.handle} {...rest} />
}

export default React.memo(Handle)
