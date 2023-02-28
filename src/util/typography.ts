import { CSSProperties } from "react"

import Typography, { TypographyOptions } from "typography"
import noriegaTheme from "typography-theme-noriega"

export const theme = noriegaTheme as TypographyOptions

export const regularText: CSSProperties = {
  fontSize: theme.baseFontSize,
  fontFamily: theme.bodyFontFamily?.[0],
  fill: theme.headerColor,
  fontWeight: theme.bodyWeight,
}

export const labelText: CSSProperties = {
  fontFamily: theme.headerFontFamily?.[0],
  fill: theme.headerColor,
  fontWeight: theme.headerWeight,
}

export default new Typography(theme)
