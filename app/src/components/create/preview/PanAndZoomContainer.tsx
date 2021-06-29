import { ReactNode } from "react";

import { useMeasure } from "react-use";
import styled from "styled-components";

import Size from "types/Size";

const getAreaLength = (containerLength: number, childLenth: number): number =>
  containerLength > childLenth
    ? containerLength
    : childLenth + containerLength / 2;

const getAreaSize = (containerPx: Size, childPx: Size): Size => ({
  width: getAreaLength(containerPx.width, childPx.width),
  height: getAreaLength(containerPx.height, childPx.height),
});

const ScrollWrapper = styled.div`
  overflow: scroll;
  height: 100%;
  width: 100%;
`;

type ZoomAreaProps = {
  childPx: Size;
  containerPx: Size;
};

const ZoomArea = styled.div.attrs<ZoomAreaProps>(
  ({ containerPx, childPx }) => ({ style: getAreaSize(containerPx, childPx) })
)<ZoomAreaProps>`
  display: flex;
`;

type PanAndZoomContainerProps = {
  children: ReactNode;
  childrenSize: Size;
};

const PanAndZoomContainer = ({
  children,
  childrenSize,
}: PanAndZoomContainerProps) => {
  const [ref, { width, height }] = useMeasure<HTMLDivElement>();

  return (
    <ScrollWrapper ref={ref}>
      <ZoomArea childPx={childrenSize} containerPx={{ width, height }}>
        {children}
      </ZoomArea>
    </ScrollWrapper>
  );
};

export default PanAndZoomContainer;
