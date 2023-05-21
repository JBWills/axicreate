import { CSSProperties, DependencyList, useMemo } from "react"

import { Theme, ThemeType } from "../theme/theme"

export function useStyles<T extends { [key in string]: CSSProperties }>(
  factory: (theme: ThemeType) => T,
  deps: DependencyList
): T {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => factory(Theme), deps)
}
