import { Camera, PerspectiveCamera } from "three"

export function coercePerspectiveCamera(camera: Camera): PerspectiveCamera {
  if (!isPerspectiveCamera(camera)) {
    throw new Error(
      `You can only save to svg with perspective camera. Sorry. Your camera type: ${camera.type}`
    )
  }

  return camera
}

export function isPerspectiveCamera(camera: Camera): camera is PerspectiveCamera {
  return camera.type === "PerspectiveCamera"
}
