import { Expand } from "types/Meta";
import { orDefault } from "util/isUndefined";

import {
  SliderConfig,
  RangeSliderConfig,
  SelectConfig,
} from "../types/ControlDefinitions";

export const sliderWithDefaults = (
  config: SliderConfig
): Expand<Required<SliderConfig>> => {
  const min = orDefault(config.min, 0);
  const max = orDefault(config.max, min + 1);

  return {
    type: "slider",
    id: config.id,
    label: orDefault(config.label, config.id),
    formatLabel: orDefault(config.formatLabel, (value: number) => value),
    initialValue: min,
    max,
    min,
    orientation: orDefault(config.orientation, "horizontal"),
    step: config.step || null,
    suffix: null,
  };
};

export const rangeSliderWithDefaults = (
  config: RangeSliderConfig
): Expand<Required<RangeSliderConfig>> => {
  const step = orDefault(config.step, null);
  const min = orDefault(config.min, 0);
  const max = orDefault(config.max, min + 1);

  return {
    type: "rangeSlider",
    id: config.id,
    label: orDefault(config.label, config.id),
    formatLabel: orDefault(config.formatLabel, (value: number) => value),
    initialValue: [min, max],
    max,
    min,
    orientation: orDefault(config.orientation, "horizontal"),
    step,
    suffix: null,
  };
};

export const selectWithDefaults = (
  config: SelectConfig
): Required<SelectConfig> => {
  return {
    id: config.id,
    initialValue: config.options[0],
    label: orDefault(config.label, config.id),
    options: config.options,
    type: "select",
  };
};
