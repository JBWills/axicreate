export type RgbColor = RgbColorBase & {
  type: "rgb"
}

export type RgbColorBase = {
  r: number
  g: number
  b: number
}

export type RgbColorLike = RgbColor | [number, number, number] | RgbColorBase

export type HslColor = {
  h: number
  s: number
  l: number
}

export function toRgbColor(like: RgbColorLike): RgbColor {
  if (Array.isArray(like)) {
    return {
      type: "rgb",
      r: like[0],
      g: like[1],
      b: like[2],
    }
  }

  if ("type" in like) {
    return like
  }

  return { type: "rgb", ...like }
}
