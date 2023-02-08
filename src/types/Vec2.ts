import { Vector2 } from "three"

import type { Vec3 } from "./Vec3"
import unreachable from "../util/unreachable"

export interface Vec2Object {
  x: number
  y: number
  readonly isVec2: true
}

export type Vec2Array = [number, number]

export type VecSingle = number

export type Vec2 =
  | Vec2Object
  | Vec2Array
  | VecSingle
  | Pick<Vec2Object, "x" | "y">

export function formatVec2(vec: Vec3 | Vec2): Vec2Object
export function formatVec2(vec: undefined): undefined
export function formatVec2(vec: Vec3 | Vec2 | undefined): Vec2Object | undefined
export function formatVec2(
  vec: Vec3 | Vec2 | undefined
): Vec2Object | undefined {
  if (vec === undefined) {
    return undefined
  }

  if (typeof vec === "number") {
    return {
      x: vec,
      y: vec,
      isVec2: true,
    }
  }

  if (Array.isArray(vec)) {
    return {
      x: vec[0],
      y: vec[1],
      isVec2: true,
    }
  }

  if (typeof vec === "object") {
    return {
      x: vec.x,
      y: vec.y,
      isVec2: true,
    }
  }

  unreachable(vec)
}

export function toVector2(vec: Vec3 | Vec2): Vector2
export function toVector2(vec: undefined): undefined
export function toVector2(vec: Vec3 | Vec2 | undefined): Vector2 | undefined
export function toVector2(vec: Vec3 | Vec2 | undefined): Vector2 | undefined {
  const obj = formatVec2(vec)

  if (obj === undefined) {
    return undefined
  }

  return new Vector2(obj.x, obj.y)
}
