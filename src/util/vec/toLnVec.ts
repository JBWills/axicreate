import * as ln from "@lnjs/core"

export function toLnVec(v: { x: number; y: number; z: number }): ln.Vector {
  return new ln.Vector(v.x, v.y, v.z)
}
