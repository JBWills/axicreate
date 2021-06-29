import { Grid, Slider } from "@material-ui/core";

import Vec2 from "models/Vec2";
import Point from "types/Point";

export type Slider2DProps = {
  onChange: (p: Vec2) => void;
  value: Point;
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
  const handleChange = (p: { x?: number; y?: number }) => {
    const x = p.x ?? value.x;
    const y = p.y ?? value.y;
    onChange(new Vec2(x, y));
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
