import { DependencyList, useCallback } from "react";

const useCall = <T extends (...args: any[]) => any>(
  c: T,
  deps: DependencyList = []
): T => useCallback(c, deps);

export default useCall;
