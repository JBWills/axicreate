export const ModifierKeys = {
  Cmd: "meta",
  Shift: "shift",
  Ctrl: "ctrl",
  Alt: "alt",
} as const

export type ModifierType = (typeof ModifierKeys)[keyof typeof ModifierKeys]
