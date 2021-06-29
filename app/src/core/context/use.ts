import { useContext, useContextSelector } from "use-context-selector";

import AppContext, { AppActions, AppContextType, AppState } from "./AppContext";

export const use = () => useContext(AppContext);

export const useSelector = <Selected>(
  selector: (value: AppContextType) => Selected
) => useContextSelector(AppContext, selector);

export const useStateSelector = <Selected>(
  selector: (value: AppState) => Selected
) => useContextSelector(AppContext, (value) => selector(value.state));

export function useAction<K extends keyof AppActions>(
  selector: K
): AppActions[K];

export function useAction<Selected>(
  selector: (value: AppActions) => Selected
): Selected;

export function useAction<Selected, K extends keyof AppActions>(
  selector: K | ((value: AppActions) => Selected)
): AppActions[K] | Selected {
  if (typeof selector === "string") {
    return useContextSelector(AppContext, (value) => value.actions[selector]);
  }
  return useContextSelector(AppContext, (value) => selector(value.actions));
}
