import { PaddingPx } from "styled-components";

const paddingWithBasePx = (base: number): PaddingPx => ({
  tiny: base / 4,
  half: base / 2,
  base,
  double: base * 2,
  triple: base * 3,
  quad: base * 4,
});

export default paddingWithBasePx;
