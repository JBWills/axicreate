import { ReactNode, useEffect, useState, WheelEvent } from "react";

import { useMeasure } from "react-use";
import styled from "styled-components";
import { useDebounce } from "use-debounce";

import Vec2 from "models/Vec2";
import MinMax from "types/MinMax";
import Size from "types/Size";
import Background from "util/css/mixins/Background";
import { boundBetween } from "util/numberUtil";

const getAreaLength = (containerLength: number, childLength: number): number =>
  containerLength > childLength
    ? containerLength
    : childLength + containerLength / 2;

const getAreaSize = (containerPx: Size, childPx: Size): Size => ({
  width: getAreaLength(containerPx.width, childPx.width),
  height: getAreaLength(containerPx.height, childPx.height),
});

const ScrollWrapper = styled.div`
  overflow: scroll;
  height: 100%;
  width: 100%;
`;

const ZoomPlaceholder = styled.div.attrs<{ childPx: Size }>(({ childPx }) => ({
  style: childPx,
}))<{ childPx: Size }>`
  ${Background("gray1")}
`;

type ZoomAreaProps = {
  childPx: Size;
  containerPx: Size;
};

const ZoomArea = styled.div.attrs<ZoomAreaProps>(
  ({ containerPx, childPx }) => ({ style: getAreaSize(containerPx, childPx) })
)<ZoomAreaProps>`
  display: flex;
  > * {
    margin: auto;
  }
`;

type PanAndZoomContainerProps = {
  children: ReactNode;
  childrenSize: Size;
  scaleFactor: number;
  panOffset: Vec2;
  scaleMinMax?: MinMax;
  onZoom: (amount: number) => void;
  onPan: (amount: Vec2) => void;
};

const PanAndZoomContainer = ({
  children,
  childrenSize,
  scaleFactor,
  panOffset,
  scaleMinMax,
  onZoom,
  onPan,
}: PanAndZoomContainerProps) => {
  const [ref, { width, height }] = useMeasure<HTMLDivElement>();
  const [zoomDelta, setZoomDelta] = useState<number | undefined>(0);

  const [debouncedZoomDelta] = useDebounce(zoomDelta, 300);

  const getScaleFactor = (delta: number) =>
    boundBetween(scaleFactor - delta, scaleMinMax!);

  useEffect(() => {
    if (debouncedZoomDelta === undefined) return;
    onZoom(getScaleFactor(debouncedZoomDelta));
    setZoomDelta(undefined);
  }, [debouncedZoomDelta]);

  const handleOnWheel = (e: WheelEvent<HTMLDivElement>) => {
    if (e.ctrlKey) {
      setZoomDelta((oldZoomDeltaNullable) => {
        const oldZoomDelta = oldZoomDeltaNullable ?? 0;
        const currentScale = getScaleFactor(oldZoomDelta);
        return oldZoomDelta + e.deltaY * currentScale * 0.01;
      });
    } else {
      onPan(panOffset.minus(new Vec2(e.deltaX, e.deltaY).times(2)));
    }
  };

  const isZooming = !!zoomDelta;

  const childPxAfterZoom = Vec2.toVec2(childrenSize)
    .div(scaleFactor)
    .times(getScaleFactor(zoomDelta ?? 0))
    .toSize();

  return (
    <ScrollWrapper ref={ref}>
      <ZoomArea
        childPx={childPxAfterZoom}
        containerPx={{ width, height }}
        onWheel={handleOnWheel}>
        {isZooming ? <ZoomPlaceholder childPx={childPxAfterZoom} /> : children}
      </ZoomArea>
    </ScrollWrapper>
  );
};

PanAndZoomContainer.defaultProps = {
  scaleMinMax: [0.1, 20],
};

export default PanAndZoomContainer;
