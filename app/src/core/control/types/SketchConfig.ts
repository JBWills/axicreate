import { orDefault } from "util/isUndefined";

import {
  rangeSliderWithDefaults,
  selectWithDefaults,
  sliderWithDefaults,
} from "../defaults/defaults";
import {
  ControlTypes,
  FolderConfig,
  FolderConfigWithDefaults,
} from "./ControlDefinitions";

export type SketchConfig = {
  name: string;
  config: FolderConfig;
};

export type SketchConfigWithDefaults = {
  name: string;
  config: FolderConfigWithDefaults;
};

const withConfigDefaults = <T extends ControlTypes>(config: T): Required<T> => {
  let result: Required<ControlTypes> | null = null;
  switch (config.type) {
    case "rangeSlider": {
      result = rangeSliderWithDefaults(config);
      break;
    }
    case "slider": {
      result = sliderWithDefaults(config);
      break;
    }
    case "select": {
      result = selectWithDefaults(config);
      break;
    }
  }
  // We have to do this weird thing because TS can't narrow generic types properly.
  return result as unknown as Required<T>;
};

const withFolderDefaults = (
  config: FolderConfig
): FolderConfigWithDefaults => ({
  ...config,
  label: orDefault(config.label, config.id),
  controls: config.controls.map((c) =>
    c.type === "folder" ? withFolderDefaults(c) : withConfigDefaults(c)
  ),
});

export const withDefaults = (
  sketch: SketchConfig
): SketchConfigWithDefaults => {
  return { ...sketch, config: withFolderDefaults(sketch.config) };
};
