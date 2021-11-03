import MinMax from "types/MinMax";
import { V2 } from "types/Vec";
import mapTimes from "util/iterators/mapTimes";
import { valueAtPercent } from "util/numberUtil";

import AxiCircle from "./AxiCircle";

type Props = {
  numCircles: number;
  center: V2;
  radii: MinMax;
};

const DefaultProps = {};

const getRadius = (i: number, numCircles: number, radii: MinMax) =>
  valueAtPercent(numCircles === 1 ? 0.5 : i / (numCircles + 1), radii);

const ConcentricCircles = ({ numCircles, center, radii }: Props) => (
  <>
    {mapTimes(numCircles, (i) => (
      <AxiCircle
        key={i}
        center={center}
        radius={getRadius(i, numCircles, radii)}
      />
    ))}
  </>
);

ConcentricCircles.defaultProps = DefaultProps;

export default ConcentricCircles;
