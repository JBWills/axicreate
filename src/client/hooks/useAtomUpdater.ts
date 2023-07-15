import { useCallback } from "react"

import { SetterOrUpdater } from "recoil"

export function useAtomUpdater<T, K extends keyof T>(
  setter: SetterOrUpdater<T>,
  fieldName: K
): (newVal: T[K]) => void {
  return useCallback(
    (newVal: T[K]) => setter((oldState) => ({ ...oldState, [fieldName]: newVal })),
    [fieldName, setter]
  )
}
