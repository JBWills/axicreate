import { createContext } from "use-context-selector";

import AppWindowPlacement from "types/AppWindowPlacement";
import Canvas from "types/Canvas";
import Point from "types/Point";
import Size from "types/Size";

type Callback = () => void;

export type AppState = {
  windowPlacement: AppWindowPlacement;
  canvas: Canvas;
};

export type AppActions = {
  moveWindow: (offset: Point) => void;
  movePreview: (offset: Point) => void;
  scalePreview: (s: Point) => void;
  resizeWindow: (s: Size) => void;
  resizeCanvas: (s: Size) => void;
  resizeDrawer: (percent: number) => void;
};

export type AppContextType = {
  state: AppState;
  actions: AppActions;
};

const UNIMPLEMENTED_ACTION: Callback = () => {
  throw new Error("Not implemented");
};

export const defaultAppContextState: AppState = {
  windowPlacement: {
    windowSize: { width: 800, height: 600 },
    windowOffset: { x: 0, y: 0 },
    controlDrawerPercent: 0.3,
    previewScale: { x: 1, y: 1 },
    previewOffset: { x: 0, y: 0 },
  },
  canvas: {
    size: { width: 100, height: 200 },
  },
};

const defaultAppContextActions: AppActions = {
  moveWindow: UNIMPLEMENTED_ACTION,
  movePreview: UNIMPLEMENTED_ACTION,
  scalePreview: UNIMPLEMENTED_ACTION,
  resizeWindow: UNIMPLEMENTED_ACTION,
  resizeCanvas: UNIMPLEMENTED_ACTION,
  resizeDrawer: UNIMPLEMENTED_ACTION,
};

export default createContext<AppContextType>({
  state: defaultAppContextState,
  actions: defaultAppContextActions,
});
