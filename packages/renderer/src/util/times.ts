export function times<T>(n: number, f: (i: number) => T): T[] {
  return Array.from(Array(n)).map((_, i) => f(i))
}

export function timesFlat<T>(n: number, f: (i: number) => T[]): T[] {
  return Array.from(Array(n)).flatMap((_, i) => f(i))
}
