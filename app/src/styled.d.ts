// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export type ThemeColors = {
    primary02: string;
    primary01: string;
    primary: string;
    primary1: string;
    primary2: string;
    secondary: string;
    white: string;
    gray03: string;
    gray02: string;
    gray01: string;
    gray: string;
    gray1: string;
    gray2: string;
    black: string;
    error03: string;
    error02: string;
    error01: string;
    error: string;
    error1: string;
    error2: string;
    success03: string;
    success02: string;
    success01: string;
    success: string;
    success1: string;
    success2: string;
    warning03: string;
    warning02: string;
    warning01: string;
    warning: string;
    warning1: string;
    warning2: string;
    text: string;
    textInverted: string;
  };

  export interface Theme {
    borderRadius: string;
    borderRadiusThin: string;
    borderRadiusThick: string;

    colors: ThemeColors;
  }
}
