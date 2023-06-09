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
}
