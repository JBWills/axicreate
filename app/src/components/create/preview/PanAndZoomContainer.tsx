import { ReactNode, useEffect, useState, WheelEvent } from "react";

import { useMeasure } from "react-use";
import styled from "styled-components";
import { useDebounce } from "use-debounce";

import MinMax from "types/MinMax";
import { Vec, V2 } from "types/Vec";
import { v2 } from "util/conversions/createVec";
import Background from "util/css/mixins/Background";
import { minus, times } from "util/math/vector/arithmetic";
import { boundBetween } from "util/numberUtil";

const getAreaLength = (containerLength: number, childLength: number): number =>
  containerLength > childLength
    ? containerLength
    : childLength + containerLength / 2;

const getAreaSize = (containerPx: V2, childPx: V2): V2 =>
  v2(
    getAreaLength(containerPx.x, childPx.x),
    getAreaLength(containerPx.y, childPx.y)
  );

const ScrollWrapper = styled.div`
  overflow: scroll;
  height: 100%;
  width: 100%;
`;

const ZoomPlaceholder = styled.div.attrs<{ childPx: Vec }>(({ childPx }) => ({
  style: childPx,
}))<{ childPx: Vec }>`
  ${Background("gray1")}
`;

type ZoomAreaProps = {
  childPx: V2;
  containerPx: V2;
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
  childrenSize: V2;
  scaleFactor: number;
  panOffset: V2;
  scaleMinMax?: MinMax;
  onZoom: (amount: number) => void;
  onPan: (amount: V2) => void;
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

  const getScaleFactor = (delta: number | undefined) =>
    delta === undefined
      ? scaleFactor
      : boundBetween(scaleFactor - delta, scaleMinMax!);

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
    } else if (e.deltaX != null && e.deltaY != null) {
      const deltaV2 = v2(e.deltaX, e.deltaY);
      const offsetDelta = minus(deltaV2, panOffset);
      onPan(times(offsetDelta, 2));
    }
  };

  const isZooming = !!zoomDelta;

  const childPxAfterZoom = times(
    v2(childrenSize),
    getScaleFactor(zoomDelta) / scaleFactor
  );

  return (
    <ScrollWrapper ref={ref}>
      <ZoomArea
        childPx={childPxAfterZoom}
        containerPx={v2(width, height)}
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
