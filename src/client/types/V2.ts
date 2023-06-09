import { F, MathableFunc, UF, UnaryFunc } from "./MathableFunc"
import { clampNumber } from "../util/clamp"
import { RangeNum } from "../util/percentAlong"

export type RangeV2 = [V2, V2]

export type Point = { x: number; y: number }

type V2Able = { x: number; y: number } | number

export class V2 {
  private readonly v: { x: number; y: number }

  x: number

  y: number

  constructor(xInput: number, yInput: number) {
    this.v = { x: xInput, y: yInput }
    this.x = xInput
    this.y = yInput
  }

  applyUnary(fun: UnaryFunc): () => V2 {
    return () => {
      return new V2(fun(this.x), fun(this.y))
    }
  }

  apply(fun: MathableFunc): (other: V2Able) => V2 {
    return (other) => {
      const otherV2 = V2.from(other)
      return new V2(fun(this.x, otherV2.x), fun(this.y, otherV2.y))
    }
  }

  plus(other: V2Able) {
    return this.apply(F.plus)(other)
  }

  minus(other: V2Able) {
    return this.apply(F.minus)(other)
  }

  times(other: V2Able) {
    return this.apply(F.times)(other)
  }

  div(other: V2Able) {
    return this.apply(F.div)(other)
  }

  unaryMinus = () => this.times(-1)

  squared() {
    return this.apply(UF.squared)(2)
  }

  pow(other: V2Able) {
    return this.apply(F.pow)(other)
  }

  map<T>(f: (n: number) => T): [T, T] {
    const { x, y } = this
    return [f(x), f(y)]
  }

  mapV2<T>(f: (n: number) => number): V2 {
    const { x, y } = this
    return new V2(f(x), f(y))
  }

  clamp(minMax: RangeV2 | RangeNum): V2 {
    const [min, max] = toRangeV2(minMax)
    return new V2(clampNumber(this.x, [min.x, max.x]), clampNumber(this.y, [min.y, max.y]))
  }

  percentAlongRange(range: RangeV2 | RangeNum): V2 {
    const [min, max] = toRangeV2(range)
    const dist = max.minus(min)
    return this.minus(min).div(dist)
  }

  getValueAtPercentAlongRange(range: RangeV2 | RangeNum): V2 {
    const [min, max] = toRangeV2(range)
    const dist = max.minus(min)
    return min.plus(this.times(dist))
  }

  mapped({ from, to }: { from: RangeV2 | RangeNum; to: RangeV2 | RangeNum }): V2 {
    return this.percentAlongRange(from).getValueAtPercentAlongRange(to)
  }

  static from(arg1: number | { x: number; y: number } | V2): V2

  static from(arg1: number, arg2: number): V2

  static from(arg1: number | { x: number; y: number } | V2, arg2?: number | undefined): V2 {
    if (typeof arg1 === "number") {
      return new V2(arg1, arg2 ?? arg1)
    }
    return new V2(arg1.x, arg1.y)
  }

  toString() {
    return `(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`
  }
}

function toRangeV2(minMax: RangeV2 | RangeNum): RangeV2 {
  const min = typeof minMax[0] === "number" ? V2.from(minMax[0]) : minMax[0]
  const max = typeof minMax[1] === "number" ? V2.from(minMax[1]) : minMax[1]
  return [min, max]
}
