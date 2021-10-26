export type V1 = {
  x: number;
  type: "v1";
};

export type V2 = {
  x: number;
  y: number;
  type: "v2";
};

export type V3 = {
  x: number;
  y: number;
  z: number;
  type: "v3";
};

export type Vec =
  | V3
  | V2
  | V1
  | [number, number, number]
  | [number, number]
  | [number]
  | number;
