import { Vector3 } from "three"

import type { Vec2, VecSingle } from "./Vec2"
import unreachable from "../util/unreachable"

export interface Vec3Object {
  x: number
  y: number
  z: number
  readonly isVec3: true
}

export type Vec3Array = [number, number, number]

export type Vec3 =
  | Vec3Object
  | Vec3Array
  | VecSingle
  | Pick<Vec3Object, "x" | "y" | "z">

export function getZ(vec: Vec3): number {
  if (typeof vec === "number") {
    return vec
  }

  if (Array.isArray(vec)) {
    return vec[2]
  }

  if (typeof vec === "object") {
    return vec.z
  }

  unreachable(vec)
}

export function formatVec3(vec: Vec3 | Vec2): Vec3Object
export function formatVec3(vec: undefined): undefined
export function formatVec3(vec: Vec3 | Vec2 | undefined): Vec3Object | undefined
export function formatVec3(
  vec: Vec3 | Vec2 | undefined
): Vec3Object | undefined {
  if (vec === undefined) {
    return undefined
  }

  if (typeof vec === "number") {
    return {
      x: vec,
      y: vec,
      z: vec,
      isVec3: true,
    }
  }

  if (Array.isArray(vec)) {
    return {
      x: vec[0],
      y: vec[1],
      z: vec[2] ?? 0,
      isVec3: true,
    }
  }

  if (typeof vec === "object") {
    return {
      x: vec.x,
      y: vec.y,
      z: "z" in vec ? vec.z : 0,
      isVec3: true,
    }
  }

  unreachable(vec)
}

export function toVector3(vec: Vec3 | Vec2): Vector3
export function toVector3(vec: undefined): undefined
export function toVector3(vec: Vec3 | Vec2 | undefined): Vector3 | undefined
export function toVector3(vec: Vec3 | Vec2 | undefined): Vector3 | undefined {
  const obj = formatVec3(vec)

  if (obj === undefined) {
    return undefined
  }

  return new Vector3(obj.x, obj.y, obj.z)
}
