import Point from "types/Point";
import Size from "types/Size";

class Vec2 {
  x: number;

  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  reduce = (
    other: Vec2 | number,
    f: (vThis: number, vOther: number) => number
  ): Vec2 => {
    if (typeof other === "number") {
      return new Vec2(f(this.x, other), f(this.y, other));
    }
    return new Vec2(f(this.x, other.x), f(this.y, other.y));
  };

  times = (other: number | Vec2): Vec2 => this.reduce(other, (v, v2) => v * v2);

  plus = (other: number | Vec2): Vec2 => this.reduce(other, (v, v2) => v + v2);

  minus = (other: number | Vec2): Vec2 => this.reduce(other, (v, v2) => v - v2);

  div = (other: number | Vec2): Vec2 => this.reduce(other, (v, v2) => v / v2);

  invert = (): Vec2 => new Vec2(-this.x, -this.y);

  toSize = (): Size => ({ width: this.x, height: this.y });

  static toVec2 = (val: Size | Point | number | Vec2): Vec2 => {
    if (val instanceof Vec2) return val;
    if (typeof val === "number") return new Vec2(val, val);
    if ("width" in val) return new Vec2(val.width, val.height);
    return new Vec2(val.x, val.y);
  };
}

export default Vec2;
