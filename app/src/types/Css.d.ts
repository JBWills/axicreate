import {
  FlattenInterpolation,
  FlattenSimpleInterpolation,
  Theme,
  ThemeProps,
} from "styled-components";

type Css = FlattenSimpleInterpolation | FlattenInterpolation<ThemeProps<Theme>>;

export default Css;
