import { SketchState } from "src/client/context/recoil/util/SketchState"
import { WaveSketchState } from "src/client/framework/sketches/WaveSketch"
import { SketchName } from "src/shared/types/sketchNames"

import { WaveGridSketchState } from "./WaveGridSketch"

export default {
  Wave: WaveSketchState,
  WaveGrid: WaveGridSketchState,
} satisfies { [K in SketchName]: SketchState<any, K> }
