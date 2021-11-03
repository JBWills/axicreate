import { Circle } from "@react-three/drei";

import { Vec } from "types/Vec";
import { toVector3 } from "util/conversions/vectorConversion";
import { boundBetween } from "util/numberUtil";

type Props = {
  center: Vec;
  radius?: number;
  thetaStart?: number;
  thetaLength?: number;
  segmentsOverride?: number | null;
};

const AxiCircle = ({
  center,
  radius = 5,
  thetaStart = 0,
  thetaLength = 0,
  segmentsOverride = null,
}: Props) => {
  const segments = segmentsOverride || boundBetween(radius / 5, [10, 500]);

  return (
    <Circle
      args={[radius, segments, thetaStart, thetaLength]}
      position={toVector3(center)}
    />
  );
};

export default AxiCircle;
