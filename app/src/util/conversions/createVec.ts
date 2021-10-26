import { Vec, V1, V2, V3 } from "types/Vec";
import { getX, getYOrNull, getZOrNull } from "util/conversions/vecGetters";

type V1Overloads = {
  (x: number): V1;
  (x: Vec): V1;
};

export const v1: V1Overloads = (x: any): V1 => ({
  x: getX(x),
  type: "v1",
});

type V2Overloads = {
  (x: number, y: number): V2;
  (x: Vec): V2;
};

export const v2: V2Overloads = (xOrVec: any, y?: number): V2 => ({
  x: getX(xOrVec),
  y: getYOrNull(xOrVec) || y || 0,
  type: "v2",
});

type V3Overloads = {
  (x: number, y: number, z: number): V3;
  (x: Vec): V3;
};

export const v3: V3Overloads = (xOrVec: any, y?: number, z?: number): V3 => ({
  x: getX(xOrVec),
  y: getYOrNull(xOrVec) || y || 0,
  z: getZOrNull(xOrVec) || z || 0,
  type: "v3",
});
