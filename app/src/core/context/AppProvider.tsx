import React, { useCallback, useState } from "react";

import AppWindowPlacement from "types/AppWindowPlacement";
import Canvas from "types/Canvas";
import applyOverrides from "util/state/applyOverrides";

import AppContext, {
  AppContextType,
  defaultAppContextState,
} from "./AppContext";

type ProviderProps = {
  children: React.ReactNode;
};

const AppProvider = ({ children }: ProviderProps) => {
  const [canvas, setCanvasState] = useState(defaultAppContextState.canvas);
  const [windowPlacement, setAppWindowPlacement] = useState(
    defaultAppContextState.windowPlacement
  );

  const setWindow = (overrides: Partial<AppWindowPlacement>) =>
    applyOverrides(setAppWindowPlacement, overrides);

  const setCanvas = (overrides: Partial<Canvas>) =>
    applyOverrides(setCanvasState, overrides);

  const value: AppContextType = {
    state: { canvas, windowPlacement },
    actions: {
      moveWindow: useCallback(
        (windowOffset) => setWindow({ windowOffset }),
        []
      ),
      movePreview: useCallback(
        (previewOffset) => setWindow({ previewOffset }),
        []
      ),
      scalePreview: useCallback(
        (previewScale) => setWindow({ previewScale }),
        []
      ),
      resizeCanvas: useCallback((size) => setCanvas({ size }), []),
      resizeWindow: useCallback((windowSize) => setWindow({ windowSize }), []),
      resizeDrawer: useCallback(
        (p) => setWindow({ controlDrawerPercent: p }),
        []
      ),
    },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
