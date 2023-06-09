import { Box, Ray } from "@lnjs/core"

import { Segment } from "src/client/types/Segment"
import { V3 } from "src/client/types/V3"

import { AnyLine, segments } from "../polyline/toSegments"

export function rayIntersectsPolyline(
  ray: Ray,
  polylines: AnyLine[],
  polylineBounds: Box
): { hit: true; hitDistance: number } | { hit: false } {
  if (!polylineBounds.intersect(ray)) {
    return { hit: false }
  }

  let closestHit: { hit: true; hitDistance: number } | undefined
  for (const segment of segments(polylines)) {
    const maybeHit = rayHitSegment(ray, segment)
    if (maybeHit) {
      closestHit = {
        hit: true,
        hitDistance: Math.min(closestHit?.hitDistance ?? Number.MAX_SAFE_INTEGER, maybeHit),
      }
    }
  }

  return closestHit ?? { hit: false }
}

const coPlanerThreshold = 0.7
const lengthErrorThreshold = 1e-3

function rayHitSegment(ray: Ray, segment: Segment): number | undefined {
  const rayDirection = V3.from(ray.direction)
  const rayOrigin = V3.from(ray.origin)
  const segmentDelta = segment.p2.minus(segment.p1)
  const segmentStartToRayOrigin = segment.p1.minus(rayOrigin)

  if (
    Math.abs(segmentStartToRayOrigin.dot(rayDirection.cross(segmentDelta))) >= coPlanerThreshold
  ) {
    // Lines are not coplanar
    return undefined
  }

  const s =
    segmentStartToRayOrigin.cross(segmentDelta).dot(rayDirection.cross(segmentDelta)) /
    rayDirection.cross(segmentDelta).magnitudeSquared

  if (s >= 0.0 && s <= 1.0) {
    const distance = rayDirection.times(s)
    // Means we have an intersection
    const intersection = rayOrigin.plus(distance)

    // See if this lies on the segment
    if (
      intersection.distSquared(segment.p1) + intersection.distSquared(segment.p2) <=
      segment.lengthSquared + lengthErrorThreshold
    ) {
      return distance.magnitude
    }
  }

  return undefined
}
