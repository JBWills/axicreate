import React, { useCallback, useState } from "react";

import AppContext, { defaultAppContextState } from "./AppContext";

type ProviderProps = {
  children: React.ReactNode;
};

const AppProvider = ({ children }: ProviderProps) => {
  const [counter, setCounter] = useState(defaultAppContextState.counter);
  const [counter2, setCounter2] = useState(defaultAppContextState.counter2);

  const increment = useCallback(() => setCounter((c) => c + 1), []);
  const decrement = useCallback(() => setCounter((c) => c - 1), []);

  const increment2 = useCallback(() => setCounter2((c) => c + 1), []);
  const decrement2 = useCallback(() => setCounter2((c) => c - 1), []);

  const value = {
    state: { counter, counter2 },
    actions: {
      increment,
      decrement,
      increment2,
      decrement2,
    },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
