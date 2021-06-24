// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface Theme {
    borderRadius: string;

    colors: {
      primary: string;
      secondary: string;
      text: string;
      textInverted: string;
      success: string;
      warning: string;
      error: string;
      black: string;
      white: string;
    };
  }
}
