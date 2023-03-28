import { MersenneTwister19937, integer, bool, real } from "random-js"

export type Random = MersenneTwister19937

export class AxiRandom {
  marsenne: MersenneTwister19937

  constructor(seed: number) {
    this.marsenne = MersenneTwister19937.seed(seed)
  }

  nextInt(minMax?: [number, number]): number {
    if (minMax) {
      return integer(minMax[0], minMax[1])(this.marsenne)
    }

    return this.marsenne.next()
  }

  nextBool(percentTrue: number = 0.5): boolean {
    return bool(percentTrue)(this.marsenne)
  }

  nextFloat(minMax?: [number, number]): number {
    if (minMax) {
      return real(minMax[0], minMax[1], true)(this.marsenne)
    }
    return this.marsenne.next()
  }
}
