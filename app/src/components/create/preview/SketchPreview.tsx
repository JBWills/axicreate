/* eslint-disable no-param-reassign */
import { Canvas } from "@react-three/fiber";
import styled from "styled-components";

import { V2 } from "types/Vec";
import { toPxString } from "util/css/cssUtil";
import Border from "util/css/mixins/Border";
import { getBoundRectPoints } from "util/math/geom/boundRect";
import { times } from "util/math/vector/arithmetic";

import AxiLine from "../primitives/AxiLine";
import ConcentricCircles from "../primitives/ConcentricCircles";

type SketchPreviewProps = {
  size: V2;
  scale: V2;
  offset: V2;
};

const StyledStage = styled.div<{ offset: V2; size: V2 }>`
  overflow: visible;
  width: ${({ size }) => toPxString(size.x)};
  height: ${({ size }) => toPxString(size.y)};
  ${Border({ color: "white" })};
`;

const SketchPreview = ({ offset, scale, size }: SketchPreviewProps) => (
  <StyledStage offset={offset} size={times(size, scale)}>
    <Canvas>
      <meshBasicMaterial wireframe />
      <AxiLine
        points={[
          [0, 0],
          [300, 300],
          [100, 200],
          [10, 15],
          [1, 1.5],
        ]}
      />
      {getBoundRectPoints(size).map((point) => {
        return (
          <ConcentricCircles
            key={`${point.x}+ ${point.y}`}
            center={point}
            numCircles={10}
            radii={[1, 10]}
          />
        );
      })}
    </Canvas>
  </StyledStage>
);

export default SketchPreview;
