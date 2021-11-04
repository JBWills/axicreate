export const isUndefined = <T>(v: T | undefined): v is undefined => {
  return v === undefined;
};

export const orDefault = <T>(v: T | undefined, defaultValue: T): T => {
  return isUndefined(v) ? defaultValue : v;
};

export const orGetDefault = <T>(
  v: T | undefined,
  defaultGetter: () => T
): T => {
  return isUndefined(v) ? defaultGetter() : v;
};
