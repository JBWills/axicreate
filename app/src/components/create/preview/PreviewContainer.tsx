import styled from "styled-components";

import { useAction, useStateSelector } from "core/context/use";
import Vec2 from "models/Vec2";
import Size from "types/Size";
import { FillParent } from "util/css/mixins";

import PanAndZoomContainer from "./PanAndZoomContainer";
import SketchPreview from "./SketchPreview";

const ContainerStyle = styled.div`
  background: ${({ theme }) => theme.colors.black};
  ${FillParent}
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const PreviewControls = styled.div`
  background: ${({ theme }) => theme.colors.error};
  width: 100%;
  height: 100px;
  flex-shrink: 0;
`;

const PreviewContainer = () => {
  const scalePreview = useAction("scalePreview");
  const movePreview = useAction("movePreview");
  const previewScale = useStateSelector((s) => s.windowPlacement.previewScale);
  const previewOffset = useStateSelector(
    (s) => s.windowPlacement.previewOffset
  );

  const canvasSize = useStateSelector((s) => s.canvas.size);

  const scaledCanvasSize: Size = {
    width: canvasSize.width * previewScale.x,
    height: canvasSize.height * previewScale.y,
  };

  return (
    <ContainerStyle>
      <PreviewControls />
      <PanAndZoomContainer
        childrenSize={scaledCanvasSize}
        scaleFactor={previewScale.x}
        panOffset={Vec2.toVec2(previewOffset)}
        onZoom={(amount: number) => {
          scalePreview({ x: amount, y: amount });
        }}
        onPan={(amount: Vec2) => {
          movePreview(amount);
        }}>
        <SketchPreview
          size={canvasSize}
          offset={{ x: 0, y: 0 }}
          scale={previewScale}
        />
      </PanAndZoomContainer>
    </ContainerStyle>
  );
};

export default PreviewContainer;
