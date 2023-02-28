import { Vec2, getX, getY } from "../types/Vec2"

export default function vecString(v: Vec2): string {
  return `(${getX(v).toFixed(2)}, ${getY(v).toFixed(2)})`
}
