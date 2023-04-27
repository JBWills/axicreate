import { ReactNode, useContext, useMemo } from "react"

import { Color } from "three"

import {
  GroupContext,
  GroupContextState,
  getContext,
} from "../../context/GroupContext"

export function Group({
  strokeColor,
  fillColor,
  strokeWidth,
  isDefaultGroup,
  children,
}:
  | {
      strokeColor?: Color
      fillColor?: Color
      strokeWidth?: number
      isDefaultGroup?: false
      children: ReactNode
    }
  | {
      strokeColor: Color
      fillColor: Color
      strokeWidth: number
      isDefaultGroup: true
      children: ReactNode
    }) {
  const parentContext = useContext(GroupContext)
  const value = useMemo<GroupContextState>(
    () =>
      getContext(
        isDefaultGroup
          ? { strokeColor, fillColor, strokeWidth }
          : {
              ...parentContext,
              ...(strokeColor && { strokeColor }),
              ...(fillColor && { fillColor }),
              ...(strokeWidth && { strokeWidth }),
            }
      ),
    [fillColor, isDefaultGroup, parentContext, strokeColor, strokeWidth]
  )

  return <GroupContext.Provider value={value}>{children}</GroupContext.Provider>
}
