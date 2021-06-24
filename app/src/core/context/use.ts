import { useContext, useContextSelector } from "use-context-selector";

import AppContext, { AppContextType } from "./AppContext";

export const use = () => useContext(AppContext);

export const useSelector = <Selected>(
  selector: (value: AppContextType) => Selected
) => useContextSelector(AppContext, selector);
