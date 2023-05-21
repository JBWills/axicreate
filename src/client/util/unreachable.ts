export default function unreachable(x: never): never {
  throw new Error(`Expected value to never occur: ${JSON.stringify(x)}`)
}
