import { V1, V2, V3 } from "types/Vec";
import { v1, v2, v3 } from "util/conversions/createVec";

type Transformer = (elem: number) => number;
type Transformer2 = (elem: number, elem2: number) => number;

type VAny = V1 | V2 | V3;

type ApplyOverloads = {
  (v: V1, f: Transformer): V1;
  (v: V2, f: Transformer): V2;
  (v: V3, f: Transformer): V3;
};

type Apply2Overloads = {
  (v: V1, vOther: V1, f: Transformer2): V1;
  (v: V2, vOther: V2, f: Transformer2): V2;
  (v: V3, vOther: V3, f: Transformer2): V3;
};

const isVec = (v: VAny | number): boolean => typeof v !== "number";

const apply: ApplyOverloads = (v: VAny, f: Transformer): any => {
  switch (v.type) {
    case "v1":
      return v1(f(v.x));
    case "v2":
      return v2(f(v.x), f(v.y));
    default:
      return v3(f(v.x), f(v.y), f(v.z));
  }
};

const apply2: Apply2Overloads = (v: any, vOther: any, f: Transformer2): any => {
  switch (v.type) {
    case "v1":
      return v1(f(v.x, vOther.x));
    case "v2":
      return v2(f(v.x, vOther.x), f(v.y, vOther.y));
    default:
      return v3(f(v.x, vOther.x), f(v.y, vOther.y), f(v.z, vOther.z));
  }
};

type ArithmeticOverloads = {
  (v: V1, n: number): V1;
  (v: V1, n: V1): V1;
  (v: V2, n: number): V2;
  (v: V2, n: V2): V2;
  (v: V3, n: number): V3;
  (v: V3, n: V3): V3;
};

const applyHelper = (
  v: any,
  n: any,
  f: (e1: number, e2: number) => number
): any =>
  isVec(n) ? apply2(v, n, (ve, ne) => f(ve, ne)) : apply(v, (e) => f(e, n));

export const times: ArithmeticOverloads = (v: any, n: any): any =>
  applyHelper(v, n, (e1, e2) => e1 * e2);

export const plus: ArithmeticOverloads = (v: any, n: any): any =>
  applyHelper(v, n, (e1, e2) => e1 + e2);

export const minus: ArithmeticOverloads = (v: any, n: any): any =>
  applyHelper(v, n, (e1, e2) => e1 - e2);

export const div: ArithmeticOverloads = (v: any, n: any): any =>
  applyHelper(v, n, (e1, e2) => e1 / e2);

export const pow: ArithmeticOverloads = (v: any, n: any): any =>
  applyHelper(v, n, (e1, e2) => e1 ** e2);
