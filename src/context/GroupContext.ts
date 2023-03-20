import { createContext } from "react"

import { Color } from "three"

export interface GroupContextState {
  color: Color
  fillColor: Color
  strokeWidth: number
}

const defaultState: GroupContextState = {
  color: new Color(0, 0, 0), // black
  fillColor: new Color(1, 1, 1), // white
  strokeWidth: 2,
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
