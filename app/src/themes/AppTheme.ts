import { Theme } from "styled-components";

const PRIMARY = "#47A1E5";
const SECONDARY = "#47A1E5";
const WHITE = "#F5F7F4";
const BLACK = "#211725";
const ERROR = "#B43C59";
const SUCCESS = "#4BAD7B";
const WARNING = "#C89D43";

const AppTheme: Theme = {
  borderRadius: "2px",

  colors: {
    primary: PRIMARY,
    secondary: SECONDARY,
    text: BLACK,
    textInverted: WHITE,
    success: SUCCESS,
    warning: WARNING,
    error: ERROR,
    black: BLACK,
    white: WHITE,
  },
};

export default AppTheme;
