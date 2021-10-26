import { createContext } from "use-context-selector";

import AppWindowPlacement from "types/AppWindowPlacement";
import Canvas from "types/Canvas";
import { V2 } from "types/Vec";
import { v2 } from "util/conversions/createVec";

type Callback = () => void;

export type AppState = {
  windowPlacement: AppWindowPlacement;
  canvas: Canvas;
};

export type AppActions = {
  moveWindow: (offset: V2) => void;
  movePreview: (offset: V2) => void;
  scalePreview: (s: number) => void;
  resizeWindow: (s: V2) => void;
  resizeCanvas: (s: V2) => void;
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
    windowSize: v2(800, 600),
    windowOffset: v2(0, 0),
    controlDrawerPercent: 0.3,
    previewScale: 1,
    previewOffset: v2(0, 0),
  },
  canvas: {
    size: v2(100, 200),
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
