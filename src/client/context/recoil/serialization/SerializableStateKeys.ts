import { SketchName } from "src/shared/types/sketchNames"

export type SerializableStateKeys =
  | "BoundRectState"
  | "Camera"
  | "CurrentSketchState"
  | "Draw"
  | "PaperState"
  | "ZoomLevel"
  | `${SketchName}State`
