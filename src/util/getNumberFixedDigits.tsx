export default function getNumberFixedDigits(
  n: number | undefined
): number | undefined {
  if (n === undefined) {
    return undefined
  }

  if (typeof n !== "number") {
    return n
  }

  return Number.parseFloat(n.toFixed(2))
}
