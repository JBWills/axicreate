export default function getNumberFixedDigits(
  n: number | undefined,
  options?: {
    roundIfWhole: boolean
  }
): number | undefined {
  if (n === undefined) {
    return undefined
  }

  if (typeof n !== "number") {
    return n
  }

  return Number.parseFloat(n.toFixed(3))
}
