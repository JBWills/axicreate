import { css } from "styled-components";

export const FillHeight = css`
  height: 100%;
  height: fill-available;
`;

export const FillWidth = css`
  width: 100%;
  width: fill-available;
`;

export const FillParent = css`
  ${FillHeight}
  ${FillWidth}
`;
