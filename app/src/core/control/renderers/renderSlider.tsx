import AxiSlider from "../../../components/controls/AxiSlider";
import { sliderWithDefaults } from "../defaults/defaults";
import { SliderConfig } from "../types/ControlDefinitions";

export default (
  config: SliderConfig,
  value: number,
  onChange: (newValue: number) => void
) => {
  const { id, label, min, max, orientation, step, formatLabel } =
    sliderWithDefaults(config);

  return (
    <AxiSlider
      formatLabel={formatLabel}
      id={id}
      label={label}
      minMax={[min, max]}
      onChange={onChange}
      orientation={orientation}
      step={step || undefined}
      value={value}
    />
  );
};
