import { Point } from "./V2"

export type Size = {
  w: number
  h: number
}

export function toSize(vec: Point): Size {
  return { w: vec.x, h: vec.y }
}
