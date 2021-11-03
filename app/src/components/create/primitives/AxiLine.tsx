import { Line } from "@react-three/drei";

import { Vec } from "types/Vec";
import { toVector3List } from "util/conversions/vectorConversion";

type Props = {
  points: Vec[];
};

const AxiLine = ({ points }: Props) => {
  return <Line points={toVector3List(points)} />;
};

export default AxiLine;
