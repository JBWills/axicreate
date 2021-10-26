import { css } from "styled-components";

import { V2 } from "types/Vec";

import { toPxString } from "../cssUtil";

const SizePx = (size: V2) => css`
  width: ${toPxString(size.x)};
  height: ${toPxString(size.y)};
`;

export default SizePx;
