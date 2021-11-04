import AxiRangeSlider from "../../../components/controls/AxiRangeSlider";
import { rangeSliderWithDefaults } from "../defaults/defaults";
import { RangeSliderConfig } from "../types/ControlDefinitions";

export default (
  config: RangeSliderConfig,
  value: [number, number],
  onChange: (newValue: [number, number]) => void
) => {
  const { id, label, min, max, orientation, step, formatLabel } =
    rangeSliderWithDefaults(config);

  return (
    <AxiRangeSlider
      formatLabel={formatLabel}
      id={id}
      label={label}
      minMax={[min, max]}
      onChange={onChange}
      orientation={orientation}
      step={step}
      value={value}
    />
  );
};
