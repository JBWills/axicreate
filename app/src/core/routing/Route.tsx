import loadable from "@loadable/component";
import { Switch, Route } from "react-router";
import styled from "styled-components";

import RoutesConfig from "constants/routes.json";

// Load bundles asynchronously so that the initial render happens faster
const Welcome = loadable(
  () => import(/* webpackChunkName: "WelcomeChunk" */ "pages/welcome/Welcome")
);

const Routes = () => (
  <Switch>
    <Route exact path={RoutesConfig.WELCOME} component={Welcome} />
  </Switch>
);

export default styled(Routes)`
  html {
    height: 100%;
  }

  body {
    margin: 0px;
    height: -webkit-fill-available;
  }

  #target {
    height: -webkit-fill-available;
  }
`;
