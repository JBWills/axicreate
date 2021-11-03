import { useStoreContext } from "leva";

import { ControlName, controls, ControlValue } from "constants/controls";
import { V2, V3 } from "types/Vec";

const useStoreValue = <N extends ControlName>(
  control: N
): ControlValue<N> | null => {
  const store = useStoreContext();
  const storeValue = store.get(control);

  if (storeValue === null || storeValue === undefined) return null;

  switch (controls[control].typeName) {
    case "number":
      return storeValue as number;
    case "vector2":
      return storeValue as V2;
    case "vector3":
      return storeValue as V3;
    case "boolean":
      return storeValue as boolean;
  }
};

export default <N extends ControlName>(control: N): ControlValue<N> => {
  return useStoreValue(control) || controls[control].defaultValue;
};
