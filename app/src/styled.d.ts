// import original module declarations
import "styled-components";
import { Hex, Px } from "types/Basic";

// and extend them!
declare module "styled-components" {
  export type ThemeColors = {
    primary02: Hex;
    primary01: Hex;
    primary: Hex;
    primary1: Hex;
    primary2: Hex;
    secondary: Hex;
    white: Hex;
    gray03: Hex;
    gray02: Hex;
    gray01: Hex;
    gray: Hex;
    gray1: Hex;
    gray2: Hex;
    black: Hex;
    error03: Hex;
    error02: Hex;
    error01: Hex;
    error: Hex;
    error1: Hex;
    error2: Hex;
    success03: Hex;
    success02: Hex;
    success01: Hex;
    success: Hex;
    success1: Hex;
    success2: Hex;
    warning03: Hex;
    warning02: Hex;
    warning01: Hex;
    warning: Hex;
    warning1: Hex;
    warning2: Hex;
    text: Hex;
    textInverted: Hex;
  };

  export type PaddingPx = {
    tiny: Px;
    half: Px;
    base: Px;
    double: Px;
    triple: Px;
    quad: Px;
  };

  export interface Theme {
    borderRadius: Px;
    borderRadiusThin: Px;
    borderRadiusThick: Px;

    colors: ThemeColors;
    padding: PaddingPx;
  }
}
