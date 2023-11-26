import { F, MathableFunc, UF, UnaryFunc } from "./MathableFunc"
import { toDeg, toRad } from "../util/vec/radianUtils"

export type RangeDeg = [Deg, Deg]
export type ArrDeg = [number, number, number]
export type Point3 = { x: number; y: number; z: number }

type DegAble = number

export class Deg {
  degrees: number

  public get rad(): number {
    return toRad(this.degrees)
  }

  constructor(angle: number, type: "degrees" | "radians" = "degrees") {
    if (Number.isNaN(angle)) {
      throw new Error(`Input angle is NaN. angle=${angle}`)
    }

    this.degrees = type === "degrees" ? angle : toDeg(angle)
  }

  applyUnary(fun: UnaryFunc): Deg {
    return new Deg(fun(this.degrees))
  }

  apply(fun: MathableFunc): (other: DegAble) => Deg {
    return (other) => {
      const otherDeg = Deg.from(other)
      return new Deg(fun(this.degrees, otherDeg.degrees))
    }
  }

  plus(other: DegAble) {
    return this.apply(F.plus)(other)
  }

  minus(other: DegAble) {
    return this.apply(F.minus)(other)
  }

  times(other: DegAble) {
    return this.apply(F.times)(other)
  }

  div(other: DegAble) {
    return this.apply(F.div)(other)
  }

  unaryMinus = () => new Deg(-this.degrees)

  squared() {
    return this.applyUnary(UF.squared)
  }

  abs() {
    return this.applyUnary(UF.squared)
  }

  pow(other: DegAble) {
    return this.apply(F.pow)(other)
  }

  static from(other: number): Deg {
    return new Deg(other)
  }

  toString() {
    return `D(${this.degrees.toFixed(2)})`
  }

  equals(other: any): boolean {
    if (!other) {
      return false
    }

    if (typeof other !== "object") {
      return false
    }

    if (!(other instanceof Deg)) {
      return false
    }

    return this.degrees === other.degrees
  }
}
