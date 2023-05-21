import { CSSProperties } from "react"

import { useStyles } from "../../../../hooks/useStyles"
import { regularText } from "../../../../util/typography"

export function useInputTextStyles(overrides?: CSSProperties): CSSProperties {
  return useStyles(
    () => ({
      inputText: {
        padding: 2,
        width: "100%",
        ...regularText,
        ...overrides,
      },
    }),
    [overrides]
  ).inputText
}
