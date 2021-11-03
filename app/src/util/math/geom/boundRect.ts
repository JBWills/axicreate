import { V2 } from "types/Vec";
import { v2 } from "util/conversions/createVec";

const DefaultOffset = v2(0, 0);
// eslint-disable-next-line import/prefer-default-export
export const getBoundRectPoints = (
  size: V2,
  offset: V2 = DefaultOffset
): V2[] => [
  v2(offset.x, offset.y),
  v2(size.x + offset.x, offset.y),
  v2(size.x + offset.x, size.y + offset.y),
  v2(offset.x, size.y + offset.y),
];
