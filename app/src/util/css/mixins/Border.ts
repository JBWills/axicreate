import { css, Theme, ThemeColors } from "styled-components";

import { toPxString } from "../cssUtil";

type BorderThickness = "thin" | "thick" | "normal";

type BorderProps = {
  borderThickness?: BorderThickness;
  color: keyof ThemeColors;
};

const getBorderThicknessPx = (
  theme: Theme,
  thicknessString: BorderThickness
): string => {
  let radiusPx;
  switch (thicknessString) {
    case "thin":
      radiusPx = theme.borderRadiusThin;
      break;
    case "thick":
      radiusPx = theme.borderRadiusThick;
      break;
    case "normal":
    default:
      radiusPx = theme.borderRadius;
      break;
  }

  return toPxString(radiusPx);
};

const getBorderString = (theme: Theme, props: BorderProps) => {
  const thicknessPx = getBorderThicknessPx(
    theme,
    props.borderThickness ?? "normal"
  );

  const colorHex = theme.colors[props.color];

  return `${thicknessPx} solid ${colorHex}`;
};

const Border = (props: BorderProps) => css`
  border: ${({ theme }) => getBorderString(theme, props)};
`;

export default Border;
