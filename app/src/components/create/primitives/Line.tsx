import { useMemo } from "react";

import { Vec } from "types/Vec";
import { toFloatArray } from "util/conversions/vectorConversion";

type Props = {
  points: Vec[];
};

const Line = ({ points }: Props) => {
  const positions = useMemo(() => toFloatArray(points), [points]);
  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attachObject={["attributes", "position"]}
          count={points.length}
          array={positions}
          itemSize={3}
        />
        <lineBasicMaterial color="blue" />
      </bufferGeometry>
    </line>
  );
};

export default Line;
