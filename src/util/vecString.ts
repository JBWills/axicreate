import { Vec2, getX, getY } from "../types/Vec2"

export default function vecString(v: Vec2): string {
  const x = getX(v).toFixed(2)
  const y = getY(v).toFixed(2)
  return `(${x}, ${y})`
}
