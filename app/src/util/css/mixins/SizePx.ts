import { css } from "styled-components";

import Size from "types/Size";

import { toPxString } from "../cssUtil";

const SizePx = (size: Size) => css`
  width: ${toPxString(size.width)};
  height: ${toPxString(size.height)};
`;

export default SizePx;
