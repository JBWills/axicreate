import { Suspense } from "react";

import ReactDOM from "react-dom";

import Root from "./core/application/Application";
import "bulma/css/bulma.css";

ReactDOM.render(
  <Suspense fallback="loading">
    <Root />
  </Suspense>,
  document.getElementById("target")
);
