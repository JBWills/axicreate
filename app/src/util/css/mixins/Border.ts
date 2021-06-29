import { css, Theme, ThemeColors } from "styled-components";

type BorderThickness = "thin" | "thick" | "normal";

type BorderProps = {
  borderThickness?: BorderThickness;
  color: keyof ThemeColors;
};

const getBorderThicknessPx = (
  theme: Theme,
  thicknessString: BorderThickness
): string => {
  switch (thicknessString) {
    case "thin":
      return theme.borderRadiusThin;
    case "thick":
      return theme.borderRadiusThick;
    case "normal":
    default:
      return theme.borderRadius;
  }
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
