import styled from "styled-components";

import renderRangeSlider from "core/control/renderers/renderRangeSlider";
import renderSelect from "core/control/renderers/renderSelect";
import renderSlider from "core/control/renderers/renderSlider";
import { AxiControlConfig } from "core/control/types/ControlDefinitions";
import { SketchConfigWithDefaults } from "core/control/types/SketchConfig";

const ContainerStyle = styled.div`
  background: ${({ theme }) => theme.colors.gray04};
  height: 100%;
  padding: 20px;
`;

const Control = ({ config }: { config: AxiControlConfig }) => {
  const handleChange = (v: unknown) => console.log(v, v === 0);
  switch (config.type) {
    case "folder":
      return (
        <>
          {config.controls.map((control) => (
            <Control key={control.id} config={control} />
          ))}
        </>
      );
    case "rangeSlider":
      return renderRangeSlider(
        config,
        config.initialValue || [0, 0],
        handleChange
      );
    case "slider":
      return renderSlider(config, config.initialValue || 0, handleChange);
    case "select":
      return renderSelect(config, config.initialValue || null, handleChange);
  }
};

const ControlContainer = ({
  sketchConfig,
}: {
  sketchConfig: SketchConfigWithDefaults;
}) => (
  <ContainerStyle>
    <Control config={sketchConfig.config} />
  </ContainerStyle>
);

export default ControlContainer;
