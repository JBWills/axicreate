import { Grid, Slider } from "@material-ui/core";

import { Vec, V2 } from "types/Vec";
import { v2 } from "util/conversions/createVec";

export type Slider2DProps = {
  onChange: (p: V2) => void;
  value: Vec;
  names: [string, string];
  minMaxX: [number, number];
  minMaxY: [number, number];
};

const Slider2D = ({
  names,
  minMaxX,
  minMaxY,
  onChange,
  value,
}: Slider2DProps) => {
  const v2Value = v2(value);
  const handleChange = (p: { x?: number; y?: number }) => {
    const x = p.x ?? v2Value.x;
    const y = p.y ?? v2Value.y;
    onChange(v2(x, y));
  };

  return (
    <Grid container direction="row">
      <Grid item xs={6}>
        <Slider
          name={names[0]}
          min={minMaxX[0]}
          max={minMaxX[1]}
          onChange={(_, x) => handleChange({ x: x as number })}
        />
      </Grid>
      <Grid item xs={6}>
        <Slider
          name={names[1]}
          min={minMaxY[0]}
          max={minMaxY[1]}
          onChange={(_, y) => handleChange({ y: y as number })}
        />
      </Grid>
    </Grid>
  );
};

export default Slider2D;
