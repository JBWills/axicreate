import { useHotkeys } from "react-hotkeys-hook"
import { HotkeyCallback, OptionsOrDependencyArray } from "react-hotkeys-hook/dist/types"

import { Char } from "../types/keys/Char"
import { ModifierType } from "../types/keys/ModifierKeys"
import { SpecialType } from "../types/keys/Special"

export type Key = Char | ModifierType | SpecialType

function isSingleArray(keys: Key[] | Key[][]): keys is Key[] {
  if (keys.length === 0) {
    return true
  }

  if (Array.isArray(keys[0])) {
    return false
  }

  return true
}

export default function useShortcut(
  keys: Key | Key[] | Key[][],
  callback: HotkeyCallback,
  options?: OptionsOrDependencyArray,
  dependencies?: OptionsOrDependencyArray
) {
  let keyArg: string[] = []

  if (!Array.isArray(keys)) {
    keyArg = [keys]
  } else if (isSingleArray(keys)) {
    keyArg = [keys.join("+")]
  } else {
    keyArg = keys.map((shortcut) => shortcut.join("+"))
  }

  useHotkeys(keyArg, callback, options, dependencies)
}

export function useShortcutOverride(
  keys: Key | Key[] | Key[][],
  callback: HotkeyCallback,
  options?: OptionsOrDependencyArray,
  dependencies?: OptionsOrDependencyArray
) {
  useShortcut(keys, callback, { ...options, preventDefault: true }, dependencies)
}
