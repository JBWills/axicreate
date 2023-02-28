import { vec2Div, vec2Minus, vec2Plus, vec2Times } from "./vec/vec2Arithmetic"
import { Vec2 } from "../types/Vec2"

type Range = [number, number]
type RangeVec2 = [Vec2, Vec2]

export function percentAlong(v: number, range: Range): number {
  return (v - range[0]) / (range[1] - range[0])
}

export function atPercent(percent: number, range: Range): number {
  const diff = range[1] - range[0]
  return diff * percent + range[0]
}

export function mapped({
  num,
  from,
  to,
}: {
  num: number
  from: Range
  to: Range
}): number {
  return atPercent(percentAlong(num, from), to)
}

export function vec2PercentAlong(v: Vec2, range: RangeVec2): Vec2 {
  return vec2Div(vec2Minus(v, range[0]), vec2Minus(range[1], range[0]))
}

export function vec2AtPercent(percent: Vec2, range: RangeVec2): Vec2 {
  const diff = vec2Minus(range[1], range[0])
  return vec2Plus(range[0], vec2Times(percent, diff))
}

export function vec2Mapped({
  num,
  from,
  to,
}: {
  num: Vec2
  from: RangeVec2
  to: RangeVec2
}): Vec2 {
  return vec2AtPercent(vec2PercentAlong(num, from), to)
}
