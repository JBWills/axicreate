// THis is a weird thing that you need to do to get types working.
// See https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31245#issuecomment-446011384
// eslint-disable-next-line import/no-unresolved
// import {} from "styled-components/cssprop";
import loadable from "@loadable/component";
import { createGlobalStyle, ThemeProvider } from "styled-components";

import AppTheme from "themes/AppTheme";
import { FillHeight } from "util/css/mixins";

import AppProvider from "../context/AppProvider";

// Load bundles asynchronously so that the initial render happens faster
const CreatePage = loadable(
  () =>
    import(/* webpackChunkName: "CreateChunk" */ "components/create/CreatePage")
);

const GlobalStyle = createGlobalStyle`
  html {
    ${FillHeight}
  }

  body {
    margin: 0px;
    ${FillHeight}
  }

  #target {
    ${FillHeight}
  }
`;

const Application = () => (
  <ThemeProvider theme={AppTheme}>
    <GlobalStyle />
    <AppProvider>
      <CreatePage />
    </AppProvider>
  </ThemeProvider>
);

export default Application;
