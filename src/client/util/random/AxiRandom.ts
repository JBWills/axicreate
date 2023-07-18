import { MersenneTwister19937, integer, bool, real } from "random-js"

import { V2 } from "src/client/types/V2"
import { V3 } from "src/client/types/V3"

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

  nextV3(minMax?: [V3, V3] | [number, number]): V3 {
    if (!minMax) {
      return new V3(this.nextFloat(), this.nextFloat(), this.nextFloat())
    }

    if (typeof minMax[0] === "number" && typeof minMax[1] === "number") {
      const minMaxNumber = minMax as [number, number]
      return new V3(
        this.nextFloat(minMaxNumber),
        this.nextFloat(minMaxNumber),
        this.nextFloat(minMaxNumber)
      )
    }

    const minMaxObject = minMax as [V3, V3]
    return new V3(
      this.nextFloat([minMaxObject[0].x, minMaxObject[1].x]),
      this.nextFloat([minMaxObject[0].y, minMaxObject[1].y]),
      this.nextFloat([minMaxObject[0].z, minMaxObject[1].z])
    )
  }

  nextV2(minMax?: [V2, V2] | [number, number]): V2 {
    if (!minMax) {
      return new V2(this.nextFloat(), this.nextFloat())
    }

    if (typeof minMax[0] === "number" && typeof minMax[1] === "number") {
      const minMaxNumber = minMax as [number, number]
      return new V2(this.nextFloat(minMaxNumber), this.nextFloat(minMaxNumber))
    }

    const minMaxObject = minMax as [V2, V2]
    return new V2(
      this.nextFloat([minMaxObject[0].x, minMaxObject[1].x]),
      this.nextFloat([minMaxObject[0].y, minMaxObject[1].y])
    )
  }
}
