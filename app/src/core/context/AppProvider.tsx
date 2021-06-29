import React, { useState } from "react";

import AppWindowPlacement from "types/AppWindowPlacement";
import Canvas from "types/Canvas";
import Point from "types/Point";
import Size from "types/Size";
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

  const movePreview = (previewOffset: Point) => setWindow({ previewOffset });

  const moveWindow = (windowOffset: Point) => setWindow({ windowOffset });

  const scalePreview = (previewScale: Point) => setWindow({ previewScale });

  const resizeCanvas = (canvasSize: Size) => setCanvas({ size: canvasSize });

  const resizeWindow = (windowSize: Size) => setWindow({ windowSize });

  const resizeDrawer = (controlDrawerPercent: number) =>
    setWindow({ controlDrawerPercent });

  const value: AppContextType = {
    state: { canvas, windowPlacement },
    actions: {
      moveWindow: useCall(moveWindow),
      movePreview: useCall(movePreview),
      scalePreview: useCall(scalePreview),
      resizeCanvas: useCall(resizeCanvas),
      resizeWindow: useCall(resizeWindow),
      resizeDrawer: useCall(resizeDrawer),
    },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
