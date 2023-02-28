import { Vec2, Vec2Object, formatVec2, getX, getY } from "../types/Vec2"
import { Vec3, Vec3Object, formatVec3, getZ } from "../types/Vec3"

export function clampNumber(x: number, minMax: [number, number]): number {
  if (x < minMax[0]) {
    return minMax[0]
  }
  if (x > minMax[1]) {
    return minMax[1]
  }

  return x
}

export function clampVec2(v: Vec2, minMax: [Vec2, Vec2]): Vec2Object {
  const [newX, newY] = [getX, getY].map((f) =>
    clampNumber(f(v), minMax.map(f) as [number, number])
  )

  return formatVec2([newX, newY])
}

export function clampVec3(v: Vec3, minMax: [Vec3, Vec3]): Vec3Object {
  const [newX, newY, newZ] = [getX, getY, getZ].map((f) =>
    clampNumber(f(v), minMax.map(f) as [number, number])
  )

  return formatVec3([newX, newY, newZ])
}
