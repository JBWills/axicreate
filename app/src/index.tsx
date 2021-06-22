import React, { Suspense } from "react";

import ReactDOM from "react-dom";

import Root from "./core/routing/Root";
import "bulma/css/bulma.css";

ReactDOM.render(
  <Suspense fallback="loading">
    <Root />
  </Suspense>,
  document.getElementById("target")
);
