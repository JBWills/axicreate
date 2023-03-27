import * as ln from "@lnjs/core"
import {
  Scene,
  Mesh,
  LineSegments,
  PerspectiveCamera,
  BoxGeometry,
  Float32BufferAttribute,
} from "three"

import { Size } from "../../types/Size"
import { V3 } from "../../types/V3"
import { toLnVec } from "../vec/toLnVec"

export function sceneToSvg({
  scene,
  camera,
  canvasSize,
  target,
}: {
  scene: Scene
  camera: PerspectiveCamera
  canvasSize: Size
  target: V3
}) {
  const meshes: Mesh[] = []

  scene?.traverseVisible((child) => {
    const m = child as Mesh
    if (m.isMesh) {
      const mClone = m.clone()
      mClone.children = mClone.children.filter((i) => {
        const iLineSegments = i as LineSegments | undefined

        return !iLineSegments?.isLineSegments
      })
      meshes.push(mClone)
    }
  })

  const lnScene = new ln.Scene()

  meshes.forEach((o3d) => {
    if ("geometry" in o3d && o3d.geometry instanceof BoxGeometry) {
      addBox(toLnVec(o3d.position), o3d.geometry, lnScene)
    }
  })

  const paths = lnScene.render(
    toLnVec(camera.position),
    toLnVec(target),
    toLnVec(camera.up),
    canvasSize.w,
    canvasSize.h,
    camera.fov,
    0.1,
    100,
    0.1
  )

  console.log("svg", ln.toSVG(paths, canvasSize.w, canvasSize.h))
}

function addBox(position: ln.Vector, box: BoxGeometry, scene: ln.Scene) {
  console.log(box)
  if ("position" in box.attributes) {
    const points = arrayToV3s(
      (box.attributes.position as Float32BufferAttribute).array
    )
    let min = new ln.Vector(1_000_000, 1_000_000, 1_000_000)
    let max = new ln.Vector(-1_000_000, -1_000_000, -1_000_000)

    points.forEach((point) => {
      if (min.x === point.x) {
        if (min.y === point.y) {
          if (min.z > point.z) {
            min = point
          }
        } else if (min.y > point.y) {
          min = point
        }
      } else if (min.x > point.x) {
        min = point
      }

      if (max.x === point.x) {
        if (max.y === point.y) {
          if (max.z < point.z) {
            max = point
          }
        } else if (max.y < point.y) {
          max = point
        }
      } else if (max.x < point.x) {
        max = point
      }
    })

    console.log({ min: min.x, max: max.x })

    scene.add(new ln.Cube(min.add(position), max.add(position)))
  }
}

function arrayToV3s(arr: ArrayLike<number>): ln.Vector[] {
  if (arr.length % 3 !== 0) {
    throw new Error(
      `Trying to convert an array to vector 3, but the array isn't divisible by three. ${arr.length}`
    )
  }

  const result: ln.Vector[] = []
  for (let i = 0; i < arr.length - 2; i += 3) {
    result.push(new ln.Vector(arr[i], arr[i + 1], arr[i + 2]))
  }

  return result
}
