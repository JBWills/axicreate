import { Theme } from "styled-components";

import paddingWithBasePx from "./themeUtil";

const PRIMARY02 = "#115d97";
const PRIMARY01 = "#1b79c0";
const PRIMARY = "#47A1E5";
const PRIMARY1 = "#7cb4de";
const PRIMARY2 = "#a5c8e3";
const SECONDARY = "#f381a9";
const WHITE = "#F5F7F4";
const GRAY03 = "#2d2730";
const GRAY02 = "#483d4d";
const GRAY01 = "#775f81";
const GRAY = "#928099";
const GRAY1 = "#a597aa";
const GRAY2 = "#c0b6c3";
const BLACK = "#211725";
const ERROR03 = "#691b2d";
const ERROR02 = "#803345";
const ERROR01 = "#9f3850";
const ERROR = "#B43C59";
const ERROR1 = "#cd4c6a";
const ERROR2 = "#df7c93";
const SUCCESS03 = "#115a34";
const SUCCESS02 = "#217d4e";
const SUCCESS01 = "#379062";
const SUCCESS = "#4BAD7B";
const SUCCESS1 = "#76cb9f";
const SUCCESS2 = "#b5e8ce";
const WARNING03 = "#805700";
const WARNING02 = "#976b0c";
const WARNING01 = "#ad801f";
const WARNING = "#C89D43";
const WARNING1 = "#d0b271";
const WARNING2 = "#d4c096";
const TEXT = BLACK;
const TEXT_INVERTED = WHITE;

const AppTheme: Theme = {
  borderRadius: 2,
  borderRadiusThin: 1,
  borderRadiusThick: 3,

  padding: paddingWithBasePx(16),

  colors: {
    primary02: PRIMARY02,
    primary01: PRIMARY01,
    primary: PRIMARY,
    primary1: PRIMARY1,
    primary2: PRIMARY2,
    secondary: SECONDARY,
    white: WHITE,
    gray03: GRAY03,
    gray02: GRAY02,
    gray01: GRAY01,
    gray: GRAY,
    gray1: GRAY1,
    gray2: GRAY2,
    black: BLACK,
    error03: ERROR03,
    error02: ERROR02,
    error01: ERROR01,
    error: ERROR,
    error1: ERROR1,
    error2: ERROR2,
    success03: SUCCESS03,
    success02: SUCCESS02,
    success01: SUCCESS01,
    success: SUCCESS,
    success1: SUCCESS1,
    success2: SUCCESS2,
    warning03: WARNING03,
    warning02: WARNING02,
    warning01: WARNING01,
    warning: WARNING,
    warning1: WARNING1,
    warning2: WARNING2,
    text: TEXT,
    textInverted: TEXT_INVERTED,
  },
};

export default AppTheme;
