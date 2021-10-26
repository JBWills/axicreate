import { Vec } from "types/Vec";

import { getX, getY, getZ } from "./vecGetters";

export const toV3Arr = (p: Vec): [number, number, number] => {
  return [getX(p), getY(p), getZ(p)];
};

export const toFloatArray = (points: Vec[]): Float32Array => {
  const arr = new Float32Array(points.length * 3);

  points.forEach((p, index) => {
    const xIndex = index * 3;
    const yIndex = index * 3 + 1;
    const zIndex = index * 3 + 2;

    arr[xIndex] = getX(p);
    arr[yIndex] = getY(p);
    arr[zIndex] = getZ(p);
  });

  return arr;
};
