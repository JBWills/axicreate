import { createContext } from "react"

import { Color } from "three"

export interface GroupContextState {
  strokeColor: Color | undefined
  fillColor: Color | undefined
  strokeWidth: number | undefined
}

const defaultState: GroupContextState = {
  strokeColor: undefined, // black
  fillColor: undefined, // white
  strokeWidth: undefined,
}

export function getContext(
  overrides: Partial<GroupContextState>
): GroupContextState {
  return {
    ...defaultState,
    ...overrides,
  }
}

export const GroupContext = createContext<GroupContextState>(defaultState)
