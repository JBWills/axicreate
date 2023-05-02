export function clampNumber(x: number, minMax: [number, number]): number {
  if (x < minMax[0]) {
    return minMax[0]
  }
  if (x > minMax[1]) {
    return minMax[1]
  }

  return x
}
