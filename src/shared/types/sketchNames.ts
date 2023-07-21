export const SketchNames = ["Wave", "WaveGrid"] as const
export type SketchName = (typeof SketchNames)[number]
export function isValidSketchName(s: string) {
  return (SketchNames as readonly string[]).includes(s)
}
