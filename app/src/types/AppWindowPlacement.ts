import Point from "./Point";
import Size from "./Size";

type AppWindowPlacement = {
  windowSize: Size;
  windowOffset: Point;
  controlDrawerPercent: number;
  previewScale: number;
  previewOffset: Point;
};

export default AppWindowPlacement;
