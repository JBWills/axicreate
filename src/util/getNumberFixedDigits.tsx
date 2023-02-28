export default function getNumberFixedDigits(
  n: number | undefined
): number | undefined {
  if (n === undefined) {
    return undefined
  }

  return Number.parseFloat(n.toFixed(2))
}
