import { SketchState } from "src/client/context/recoil/util/SketchState"
import { WaveSketchState } from "src/client/framework/sketches/WaveSketch"
import { SketchName } from "src/shared/types/sketchNames"

import { CircleSketchState } from "./CircleSketch"
import { WaveGridSketchState } from "./WaveGridSketch"

export default {
  Wave: WaveSketchState,
  WaveGrid: WaveGridSketchState,
  Circle: CircleSketchState,
} satisfies { [K in SketchName]: SketchState<any, K> }
