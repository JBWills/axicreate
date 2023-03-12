import { useMemo } from "react"

export function useMemoArray<A, B, C, D, E, F>(
  arr: [A, B, C, D, E, F]
): [A, B, C, D, E, F]
export function useMemoArray<A, B, C, D, E>(
  arr: [A, B, C, D, E]
): [A, B, C, D, E]
export function useMemoArray<A, B, C, D>(arr: [A, B, C, D]): [A, B, C, D]
export function useMemoArray<A, B, C>(arr: [A, B, C]): [A, B, C]
export function useMemoArray<A, B>(arr: [A, B]): [A, B]
export function useMemoArray<K, T extends Array<K>>(arr: T): T {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => arr, arr)
}
