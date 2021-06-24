/**
 * Get x bound between min and max
 *
 * @param x the value to limit
 * @param min the minimum value
 * @param max the maximum value
 */
export const boundBetween = (x: number, range: [number, number]): number => {
  const [min, max] = range;
  if (x < min) return min;
  if (x > max) return max;
  return x;
};

/**
 * Get the percentage along min..max that x lies on.
 * Ex percentBetwwen(1, 0, 2) => 0.5
 *
 * @param x the number between the points. Note that if this is not inside [min, max]
 *   the result may be less than zero or greater than one
 * @param min the minimum value
 * @param max the maximum value
 */
export const percentBetween = (x: number, range: [number, number]): number => {
  const [min, max] = range;
  const length = max - min;
  const lengthToX = x - min;

  if (length === 0) return 0;

  return lengthToX / length;
};

/**
 * Get the percentage along min..max that x lies on.
 * Ex percentBetwwen(1, 0, 2) => 0.5
 *
 * @param percent the percent along the range (50% is 0.5)
 * @param minMax the range to get the value from
 */
export const valueAtPercent = (
  percent: number,
  range: [number, number]
): number => {
  const [min, max] = range;
  const length = max - min;

  return min + length * percent;
};
