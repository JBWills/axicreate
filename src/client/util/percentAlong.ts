export type RangeNum = [number, number]

export function percentAlong(v: number, range: RangeNum): number {
  return (v - range[0]) / (range[1] - range[0])
}

export function atPercent(percent: number, range: RangeNum): number {
  const diff = range[1] - range[0]
  return diff * percent + range[0]
}

export function mapped({ num, from, to }: { num: number; from: RangeNum; to: RangeNum }): number {
  return atPercent(percentAlong(num, from), to)
}
