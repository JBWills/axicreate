import styled from "styled-components";

import AxiSlider from "components/controls/AxiSlider";
import Slider2D from "components/controls/Slider2D";
import { useAction, useStateSelector } from "core/context/use";
import Vec2 from "models/Vec2";

const ContainerStyle = styled.div`
  background: ${({ theme }) => theme.colors.white};
  height: 100%;
`;

const ControlContainer = () => {
  const previewScale = useStateSelector((s) => s.windowPlacement.previewScale);
  const previewOffset = useStateSelector(
    (s) => s.windowPlacement.previewOffset
  );
  const scalePreview = useAction("scalePreview");
  const movePreview = useAction("movePreview");
  return (
    <ContainerStyle>
      <AxiSlider
        label="Scale"
        value={previewScale}
        minMax={[0.1, 10]}
        onChange={scalePreview}
      />
      <Slider2D
        names={["Offset X", "Offset Y"]}
        minMaxX={[-300, 300]}
        minMaxY={[-300, 300]}
        onChange={(p: Vec2) => movePreview(p)}
        value={previewOffset}
      />
    </ContainerStyle>
  );
};

export default ControlContainer;
