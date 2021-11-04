import { Slider, Typography } from "@mui/material";

import MinMax from "types/MinMax";

type BaseProps = {
  id: string;
  label: string;
  minMax: MinMax;
  value: number;
  step?: number | undefined;
  orientation?: "horizontal" | "vertical";
  onChange: (v: number) => void;
  formatLabel?: (v: number) => number | string;
};

export type SliderProps = BaseProps & {
  step?: number | undefined;
  onChange: (v: number) => void;
};

export type RangeProps = BaseProps & {
  value: [number, number];
  onChange: (v: [number, number]) => void;
};

const AxiSlider = ({
  formatLabel,
  id,
  label,
  minMax,
  onChange,
  orientation,
  step,
  value,
}: SliderProps | RangeProps) => {
  const [min, max] = minMax;

  return (
    <div>
      <Typography gutterBottom>{label}</Typography>
      <Slider
        disabled={false}
        max={max}
        min={min}
        name={id}
        onChange={(_, newValue) => onChange(newValue as any)}
        orientation={orientation}
        step={step || (max - min) / 100}
        value={value}
        valueLabelDisplay="auto"
        valueLabelFormat={formatLabel}
      />
    </div>
  );
};

export default AxiSlider;
