// THis is a weird thing that you need to do to get types working.
// See https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31245#issuecomment-446011384
// eslint-disable-next-line import/no-unresolved
// import {} from "styled-components/cssprop";
import Welcome from "../../pages/welcome/Welcome";
import AppProvider from "../context/AppProvider";

const Root = () => (
  <AppProvider>
    <Welcome />
  </AppProvider>
);

export default Root;
