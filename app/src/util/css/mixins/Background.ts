import { css, ThemeColors } from "styled-components";

const Background = (color: keyof ThemeColors) => css`
  background: ${({ theme }) => theme.colors[color]};
`;

export default Background;
