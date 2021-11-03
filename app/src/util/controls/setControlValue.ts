import { StoreType } from "leva/dist/declarations/src/types";

import { ControlName, ControlValue } from "constants/controls";

export default <N extends ControlName>(
  storeContext: StoreType,
  control: N,
  value: ControlValue<N>
) => {
  storeContext.setValueAtPath(control, value);
  return useStoreValue(control) || controls[control].defaultValue;
};
