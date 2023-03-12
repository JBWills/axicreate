import { CSSProperties } from "react"

import Typography, { TypographyOptions } from "typography"
import noriegaTheme from "typography-theme-noriega"

export const typographyTheme = noriegaTheme as TypographyOptions

export const regularText: CSSProperties = {
  fontSize: typographyTheme.baseFontSize,
  fontFamily: typographyTheme.bodyFontFamily?.[0],
  fill: typographyTheme.headerColor,
  fontWeight: typographyTheme.bodyWeight,
}

export const labelText: CSSProperties = {
  fontFamily: typographyTheme.headerFontFamily?.[0],
  fill: typographyTheme.headerColor,
  fontWeight: typographyTheme.headerWeight,
}

export default new Typography(typographyTheme)
