import { Vector3 } from "three"

import { MathableFunc, UnaryFunc } from "./V2"
import { clampNumber } from "../util/clamp"
import { RangeNum } from "../util/percentAlong"

export type RangeV3 = [V3, V3]
export type Point3 = { x: number; y: number; z: number }

type V3Able = V3 | number
const F = {
  plus: (a, b) => a + b,
  minus: (a, b) => a - b,
  times: (a, b) => a * b,
  div: (a, b) => a / b,
  pow: (a, b) => a ** b,
} satisfies { [k in string]: MathableFunc }

const UF = {
  squared: (a) => a * a,
} satisfies { [k in string]: UnaryFunc }

export class V3 {
  private readonly v: { x: number; y: number; z: number }

  x: number

  y: number

  z: number

  constructor(xInput: number, yInput: number, zInput: number) {
    this.v = { x: xInput, y: yInput, z: zInput }
    this.x = xInput
    this.y = yInput
    this.z = zInput
  }

  apply(fun: MathableFunc): (other: V3Able) => V3 {
    const { x, y, z } = this
    return (other) => {
      const otherV3 = V3.from(other)
      return new V3(fun(x, otherV3.x), fun(y, otherV3.y), fun(z, otherV3.z))
    }
  }

  plus(other: V3Able) {
    return this.apply(F.plus)(other)
  }

  minus(other: V3Able) {
    return this.apply(F.minus)(other)
  }

  times(other: V3Able) {
    return this.apply(F.times)(other)
  }

  div(other: V3Able) {
    return this.apply(F.div)(other)
  }

  unaryMinus = () => new V3(-this.x, -this.y, -this.z)

  squared() {
    return this.apply(F.pow)(2)
  }

  pow(other: V3Able) {
    return this.apply(F.pow)(other)
  }

  map<T>(f: (n: number) => T): [T, T, T] {
    const { x, y, z } = this
    return [f(x), f(y), f(z)]
  }

  mapV3(f: (n: number) => number): V3 {
    const { x, y, z } = this
    return V3.from(f(x), f(y), f(z))
  }

  clamp(minMax: RangeV3 | RangeNum): V3 {
    const [min, max] = toRangeV3(minMax)
    return new V3(
      clampNumber(this.x, [min.x, max.x]),
      clampNumber(this.y, [min.y, max.y]),
      clampNumber(this.z, [min.z, max.z])
    )
  }

  percentAlongRange(range: RangeV3 | RangeNum): V3 {
    const [min, max] = toRangeV3(range)
    const dist = max.minus(min)
    return this.minus(min).div(dist)
  }

  getValueAtPercentAlongRange(range: RangeV3 | RangeNum): V3 {
    const [min, max] = toRangeV3(range)
    const dist = max.minus(min)
    return min.plus(this.times(dist))
  }

  mapped({
    from,
    to,
  }: {
    from: RangeV3 | RangeNum
    to: RangeV3 | RangeNum
  }): V3 {
    return this.percentAlongRange(from).getValueAtPercentAlongRange(to)
  }

  static from(arg1: Point3 | number): V3

  static from(arg1: number, arg2: number, arg3: number): V3

  static from(
    arg1: number | Point3,
    arg2?: number | undefined,
    arg3?: number | undefined
  ): V3 {
    if (typeof arg1 === "number") {
      return new V3(arg1, arg2 ?? arg1, arg3 ?? arg1)
    }
    const { x, y, z } = arg1
    return new V3(x, y, z)
  }

  toString() {
    const { x, y, z } = this
    return `(${x.toFixed(2)}, ${y.toFixed(2)}, ${z.toFixed(2)})`
  }

  toVector3(): Vector3 {
    const { x, y, z } = this
    return new Vector3(x, y, z)
  }
}

function toRangeV3(minMax: RangeV3 | RangeNum): RangeV3 {
  const min = typeof minMax[0] === "number" ? V3.from(minMax[0]) : minMax[0]
  const max = typeof minMax[1] === "number" ? V3.from(minMax[1]) : minMax[1]
  return [min, max]
}
