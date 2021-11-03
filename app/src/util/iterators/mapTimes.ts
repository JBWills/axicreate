const mapTimes = <T>(n: number, f: (i: number) => T): T[] => {
  return Array.from({ length: n }, (_, i) => f(i));
};

export default mapTimes;
