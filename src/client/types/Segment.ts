import { Point3, V3 } from "src/client/types/V3"

export class Segment {
  p1: V3

  p2: V3

  constructor(p1: V3, p2: V3) {
    this.p1 = p1
    this.p2 = p2
  }

  static from(p1: Point3, p2: Point3) {
    return new Segment(V3.from(p1), V3.from(p2))
  }

  public get lengthSquared(): number {
    return this.p1.distSquared(this.p2)
  }

  public get length(): number {
    return Math.sqrt(this.lengthSquared)
  }

  valueAtPercent(percent: number) {
    if (percent === 0.0) {
      return this.p1
    }

    const [min, max] = [this.p1, this.p2]
    const dist = max.minus(min)
    return min.plus(dist.times(percent))
  }

  plus(other: V3 | Segment): Segment {
    if (other instanceof Segment) {
      return new Segment(this.p1.plus(other.p1), this.p2.plus(other.p2))
    }

    return new Segment(this.p1.plus(other), this.p2.plus(other))
  }
}
