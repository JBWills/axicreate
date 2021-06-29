import styled from "styled-components";

import { useStateSelector } from "core/context/use";
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
      <PanAndZoomContainer childrenSize={scaledCanvasSize}>
        <SketchPreview
          size={canvasSize}
          offset={previewOffset}
          scale={previewScale}
        />
      </PanAndZoomContainer>
    </ContainerStyle>
  );
};

export default PreviewContainer;
