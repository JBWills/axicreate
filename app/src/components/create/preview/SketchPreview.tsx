/* eslint-disable no-param-reassign */
import { Stage, Layer, Shape } from "react-konva";
import styled from "styled-components";

import Point from "types/Point";
import Size from "types/Size";
import { toPxString } from "util/css/cssUtil";
import Border from "util/css/mixins/Border";

type SketchPreviewProps = {
  size: Size;
  scale: Point;
  offset: Point;
};

const StageWrapper = styled(Stage)`
  overflow: visible;
  width: ${({ width }) => toPxString(width)};
  height: ${({ height }) => toPxString(height)};
  ${Border({ color: "white" })};
`;

const SketchPreview = ({ offset, scale, size }: SketchPreviewProps) => (
  <StageWrapper
    width={size.width * scale.x}
    height={size.height * scale.y}
    scale={scale}
    offset={offset}>
    <Layer>
      <Shape
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(0, 0);
          context.lineTo(220, 80);
          context.quadraticCurveTo(150, 100, 260, 170);
          context.closePath();
          // (!) Konva specific method, it is very important
          context.fillStrokeShape(shape);
        }}
        fill="#00D2FF"
        stroke="black"
        strokeWidth={4}
      />
    </Layer>
  </StageWrapper>
);

export default SketchPreview;
