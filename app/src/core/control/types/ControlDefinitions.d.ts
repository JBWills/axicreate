import { Expand } from "types/Meta";

export type SelectConfig = {
  type: "select";
  id: string;
  label?: string;
  initialValue?: string;
  options: string[];
};

type SliderBaseConfig = {
  id: string;
  label?: string;
  min?: number;
  max?: number;
  step?: number | null;
  suffix?: string | null;
  orientation?: "horizontal" | "vertical";
  formatLabel?: (value: number) => string | number;
};

export type SliderConfig = Expand<
  SliderBaseConfig & {
    type: "slider";
    initialValue?: number;
  }
>;

export type RangeSliderConfig = Expand<
  SliderBaseConfig & {
    type: "rangeSlider";
    initialValue?: [number, number];
  }
>;

export type FolderConfig = {
  type: "folder";
  id: string;
  label?: string;
  orientation: "row" | "col";
  controls: AxiControlConfig[];
};

export type FolderConfigWithDefaults = {
  type: "folder";
  id: string;
  label: string;
  orientation: "row" | "col";
  controls: AxiControlConfigWithDefaults[];
};

export type ControlTypes = SelectConfig | SliderConfig | RangeSliderConfig;

export type AxiControlConfig = ControlTypes | FolderConfig;

export type AxiControlConfigWithDefaults = Expand<
  Required<ControlTypes> | FolderConfigWithDefaults
>;

export type ControlType = AxiControlConfig["type"];
