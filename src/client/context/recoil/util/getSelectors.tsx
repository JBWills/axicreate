import { RecoilState, selector } from "recoil"

import { objectKeys } from "../../../../shared/util/objectKeys"

export type RecoilSelectors<K extends keyof T, T extends Record<K, any>> = {
  [k in keyof T]: RecoilState<T[k]>
}

export function getSelectors<K extends keyof T, T extends Record<K, any>>(
  state: RecoilState<T>,
  defaultState: T
): RecoilSelectors<K, T> {
  const selectors: Partial<RecoilSelectors<K, T>> = {}
  for (const key of objectKeys(defaultState)) {
    selectors[key] = selector({
      key: `${state.key}_${String(key)}`,
      get: ({ get }) => get(state)[key],
      set: ({ set }, newValue) => set(state, (prev) => ({ ...prev, [key]: newValue })),
    })
  }

  return selectors as RecoilSelectors<K, T>
}
