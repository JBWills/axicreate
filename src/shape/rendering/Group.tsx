import { ReactNode, useMemo } from "react"

import { Color } from "three"

import {
  GroupContext,
  GroupContextState,
  getContext,
} from "../../context/GroupContext"

export function Group({
  color,
  children,
}: {
  color: Color
  children: ReactNode
}) {
  const value = useMemo<GroupContextState>(() => getContext({ color }), [color])
  return <GroupContext.Provider value={value}>{children}</GroupContext.Provider>
}
