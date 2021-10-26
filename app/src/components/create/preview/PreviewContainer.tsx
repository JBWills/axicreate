import styled from "styled-components";

import { useAction, useStateSelector } from "core/context/use";
import { V2 } from "types/Vec";
import { v2 } from "util/conversions/createVec";
import { FillParent } from "util/css/mixins";
import { times } from "util/math/vector/arithmetic";

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

  const scaledCanvasSize: V2 = times(canvasSize, previewScale);

  return (
    <ContainerStyle>
      <PreviewControls />
      <PanAndZoomContainer
        childrenSize={scaledCanvasSize}
        scaleFactor={previewScale}
        panOffset={previewOffset}
        onZoom={scalePreview}
        onPan={movePreview}>
        <SketchPreview
          size={canvasSize}
          offset={v2(0, 0)}
          scale={v2(previewScale, previewScale)}
        />
      </PanAndZoomContainer>
    </ContainerStyle>
  );
};

export default PreviewContainer;
