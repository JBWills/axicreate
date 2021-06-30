import { css, PaddingPx, Theme } from "styled-components";

import Css from "types/Css";

import { toPxString } from "../cssUtil";

type PaddingKey = "none" | keyof PaddingPx;

type PaddingOptions = {
  base?: PaddingKey;
  horizontal?: PaddingKey;
  vertical?: PaddingKey;
  top?: PaddingKey;
  bottom?: PaddingKey;
  left?: PaddingKey;
  right?: PaddingKey;
};

const getPaddingString = (theme: Theme, paddingKey: PaddingKey): string =>
  paddingKey === "none" ? "0px" : toPxString(theme.padding[paddingKey]);

const Padding = (options: PaddingOptions): Css => {
  const top = options.top ?? options.vertical ?? options.base;
  const bottom = options.bottom ?? options.vertical ?? options.base;
  const left = options.left ?? options.horizontal ?? options.base;
  const right = options.right ?? options.horizontal ?? options.base;

  return css`
    ${({ theme }) => top && `padding-top: ${getPaddingString(theme, top)}`};
    ${({ theme }) =>
      bottom && `padding-bottom: ${getPaddingString(theme, bottom)}`};
    ${({ theme }) => left && `padding-left: ${getPaddingString(theme, left)}`};
    ${({ theme }) =>
      right && `padding-right: ${getPaddingString(theme, right)}`};
  `;
};

export default Padding;
