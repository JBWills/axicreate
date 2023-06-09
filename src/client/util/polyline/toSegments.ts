import { Segment } from "src/client/types/Segment"
import { Point3 } from "src/client/types/V3"

export type AnyLine = Point3[]

function toPolylines(polyline: AnyLine | AnyLine[]): AnyLine[] {
  if (polyline.length === 0) {
    return polyline as []
  }

  if (Array.isArray(polyline[0])) {
    return polyline as AnyLine[]
  }

  return [polyline] as AnyLine[]
}

export function* segments(polylineArg: AnyLine | AnyLine[]): Generator<Segment> {
  const polylines = toPolylines(polylineArg)

  for (const polyline of polylines) {
    let lastVertex: Point3

    for (const vertex of polyline) {
      if (lastVertex !== undefined) {
        yield Segment.from(lastVertex, vertex)
      }

      lastVertex = vertex
    }
  }
}

export function everySegment(polyline: AnyLine, predicate: (segment: Segment) => boolean): boolean {
  for (const segment of segments(polyline)) {
    if (!predicate(segment)) {
      return false
    }
  }
  return true
}

export function anySegment(polyline: AnyLine, predicate: (segment: Segment) => boolean): boolean {
  for (const segment of segments(polyline)) {
    if (predicate(segment)) {
      return true
    }
  }
  return false
}

export function findSegment(
  polyline: AnyLine,
  find: (segment: Segment) => boolean
): Segment | undefined {
  for (const segment of segments(polyline)) {
    if (find(segment)) {
      return segment
    }
  }
  return undefined
}

export function toSegments(polyline: AnyLine): Segment[] {
  const segmentList: Segment[] = []
  for (const segment of segments(polyline)) {
    segmentList.push(segment)
  }
  return segmentList
}
