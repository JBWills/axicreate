import { Vec2, getX, getY } from "../../types/Vec2"

function p(v1: Vec2, v2: Vec2, f: (n1: number, n2: number) => number): Vec2 {
  return [f(getX(v1), getX(v2)), f(getY(v1), getY(v2))]
}

export function vec2Plus(v1: Vec2, v2: Vec2): Vec2 {
  return p(v1, v2, (a, b) => a + b)
}

export function vec2Minus(v1: Vec2, v2: Vec2): Vec2 {
  return p(v1, v2, (a, b) => a - b)
}

export function vec2Times(v1: Vec2, v2: Vec2): Vec2 {
  return p(v1, v2, (a, b) => a * b)
}

export function vec2Div(v1: Vec2, v2: Vec2): Vec2 {
  return p(v1, v2, (a, b) => a / b)
}
