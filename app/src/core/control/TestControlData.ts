import { AxiControlConfig, FolderConfig } from "./types/ControlDefinitions";
import { SketchConfigWithDefaults, withDefaults } from "./types/SketchConfig";

const row = ({
  id,
  label,
  controls,
}: {
  id: string;
  label?: string;
  controls: AxiControlConfig[];
}): FolderConfig => {
  return {
    type: "folder",
    id,
    label,
    orientation: "row",
    controls,
  };
};

const col = ({
  id,
  label,
  controls,
}: {
  id: string;
  label?: string;
  controls: AxiControlConfig[];
}): FolderConfig => {
  return {
    type: "folder",
    id,
    label,
    orientation: "col",
    controls,
  };
};

const config = (controls: AxiControlConfig[]) =>
  col({
    id: "controls-toplevel",
    controls,
  });

const TestControlData: SketchConfigWithDefaults = withDefaults({
  name: "testSketch",
  config: config([
    {
      type: "rangeSlider",
      id: "testRangeSlider",
      label: "Test Range",
      min: 5,
      max: 100,
      initialValue: [5, 100],
      step: 2,
    },
    {
      type: "slider",
      id: "testSlider",
      label: "Test Slider",
      min: 5,
      max: 100,
      initialValue: 10,
      step: 2,
    },
    {
      type: "slider",
      id: "testSliderNoStep",
      label: "Test Slider (No Step)",
      min: 5,
      max: 100,
      initialValue: 10,
    },
    {
      type: "slider",
      id: "testBaseSlider",
      label: "Test Base Slider (No Step)",
    },
    {
      type: "select",
      id: "testSelect",
      label: "Test Select",
      options: ["Option1", "option2", "option3", "option4"],
      initialValue: "Option1",
    },
  ]),
});

export default TestControlData;
