import { ReactNode, useContext, useMemo } from "react"

import { LineStyle } from "src/client/types/LineStyle"

import { GroupContext, GroupContextState, getContext } from "../../context/GroupContext"

interface GroupProps extends LineStyle {
  isDefaultGroup?: boolean
  children: ReactNode
}

export function Group({
  strokeColor,
  fillColor,
  strokeWidth,
  isDefaultGroup,
  children,
}: GroupProps) {
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
