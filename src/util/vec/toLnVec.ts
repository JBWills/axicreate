import * as ln from "@lnjs/core"
import { Vector3 } from "three"

import { V3 } from "../../types/V3"

export function toLnVec(v: Vector3 | V3): ln.Vector {
  return new ln.Vector(v.x, v.y, v.z)
}
