const degToRad = (2 * Math.PI) / 360.0
export function toRad(angleDeg: number) {
  return angleDeg * degToRad
}

const radToDeg = 360.0 / (2 * Math.PI)
export function toDeg(angleRad: number) {
  return angleRad * radToDeg
}
