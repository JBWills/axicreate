import React, { useState } from "react";

import AppWindowPlacement from "types/AppWindowPlacement";
import Canvas from "types/Canvas";
import useCall from "util/hooks/useCall";
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
      moveWindow: useCall((o) => setWindow({ windowOffset: o })),
      movePreview: useCall((o) => setWindow({ previewOffset: o })),
      scalePreview: useCall((s) => setWindow({ previewScale: s })),
      resizeCanvas: useCall((size) => setCanvas({ size })),
      resizeWindow: useCall((windowSize) => setWindow({ windowSize })),
      resizeDrawer: useCall((p) => setWindow({ controlDrawerPercent: p })),
    },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
