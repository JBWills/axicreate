import { Dispatch, SetStateAction } from "react";

const applyOverrides = <S extends {}>(
  setter: Dispatch<SetStateAction<S>>,
  overrides: Partial<S>
) => setter((oldStateVal: S) => ({ ...oldStateVal, ...overrides }));

export default applyOverrides;
