import { createContext } from "use-context-selector";

type Callback = () => void;

type AppState = {
  counter: number;
  counter2: number;
};

type AppActions = {
  increment: Callback;
  decrement: Callback;
  increment2: Callback;
  decrement2: Callback;
};

type AppContextType = {
  state: AppState;
  actions: AppActions;
};

const UNIMPLEMENTED_ACTION: Callback = () => {
  throw new Error("Not implemented");
};

export const defaultAppContextState: AppState = {
  counter: 0,
  counter2: 0,
};

const defaultAppContextActions: AppActions = {
  increment: UNIMPLEMENTED_ACTION,
  decrement: UNIMPLEMENTED_ACTION,
  increment2: UNIMPLEMENTED_ACTION,
  decrement2: UNIMPLEMENTED_ACTION,
};

export default createContext<AppContextType>({
  state: defaultAppContextState,
  actions: defaultAppContextActions,
});
