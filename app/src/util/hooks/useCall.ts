import { useCallback } from "react";

const useCall = <T extends (...args: any[]) => any>(c: T): T =>
  useCallback(c, []);

export default useCall;
