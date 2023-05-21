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

const MAX = new ln.Vector(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)

const MIN = new ln.Vector(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER)

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
}): string {
  const meshes: Mesh[] = []

  console.log("1: traversing the scene")
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

  console.log("2: adding geometry to the lnScene")
  meshes.forEach((o3d, index) => {
    console.log(
      `2.${index + 1}: adding a not a box to the scene`,
      "geometry" in o3d,
      "geometry" in o3d && "type" in o3d.geometry,
      "geometry" in o3d && "type" in o3d.geometry && o3d.geometry.type,
      o3d.geometry instanceof BoxGeometry,
      o3d
    )
    if ("geometry" in o3d && "type" in o3d.geometry && o3d.geometry.type === "BoxGeometry") {
      console.log(`2.${index + 1}: adding a box to the scene`)
      addBox(o3d, o3d.geometry as BoxGeometry, lnScene)
    }
  })

  console.log("3: rendering to ln")
  const paths = lnScene.render(
    toLnVec(camera.position),
    toLnVec(target),
    toLnVec(camera.up),
    canvasSize.w,
    canvasSize.h,
    camera.fov,
    0.1,
    100,
    0.01
  )

  console.log("4: Creating the SVG")
  const svg = ln.toSVG(ln.simplify(paths, 5), canvasSize.w * 2, canvasSize.h * 2)
  console.log("svg", svg)
  return svg
}

function addBox(mesh: Mesh, box: BoxGeometry, scene: ln.Scene) {
  const meshScale = toLnVec(mesh.scale)
  const meshPosition = toLnVec(mesh.position)

  if ("position" in box.attributes) {
    const points = arrayToV3s((box.attributes.position as Float32BufferAttribute).array).map((p) =>
      p.mul(meshScale)
    )
    let min = MAX
    let max = MIN
    points.forEach((point) => {
      if (compare(min, point) > 0) {
        min = point
      }
      if (compare(max, point) < 0) {
        max = point
      }
    })

    const rotatedCube = transform(
      new ln.Cube(min, max),
      // Why do I have to divide this by 2? no idea
      ln.translate(meshPosition.divScalar(2)),
      // Why are these values negative? no idea
      ln.rotate(new ln.Vector(1, 0, 0), -mesh.rotation.x),
      ln.rotate(new ln.Vector(0, 1, 0), -mesh.rotation.y),
      ln.rotate(new ln.Vector(0, 0, 1), -mesh.rotation.z)
    )

    scene.add(rotatedCube)
  }
}

function transform(shape: ln.ShapeT, ...matrices: ln.Matrix[]): ln.ShapeT {
  if (matrices.length === 0) {
    return shape
  }

  let newMatrix: ln.Matrix = matrices[0]

  matrices.forEach((matrix) => {
    newMatrix = newMatrix.mul(matrix)
  })
  return new ln.TransformedShape(shape, newMatrix)
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

function compare(v1: ln.Vector, v2: ln.Vector): number {
  if (v1.x === v2.x) {
    if (v1.y === v2.y) {
      if (v1.z === v2.z) {
        return 0
      } else if (v1.z > v2.z) {
        return 1
      } else {
        return -1
      }
    } else if (v1.y > v2.y) {
      return 1
    } else {
      return -1
    }
  } else if (v1.x > v2.x) {
    return 1
  } else {
    return -1
  }
}
