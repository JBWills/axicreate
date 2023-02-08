import { Vec2, formatVec2 } from "./Vec2"

export type Size = {
  w: number
  h: number
}

export function toSize(vec: Vec2): Size {
  const vecObj = formatVec2(vec)

  return { w: vecObj.x, h: vecObj.y }
}
