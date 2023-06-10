import { useCallback } from "react"

import { RecoilState, useSetRecoilState } from "recoil"

export function useSetSubRecoilState<V, K extends keyof V>(recoilState: RecoilState<V>, key: K) {
  const setRecoilState = useSetRecoilState(recoilState)
  return useCallback(
    (value: number) =>
      setRecoilState((oldState) => ({
        ...oldState,
        [key]: value,
      })),
    [key, setRecoilState]
  )
}
