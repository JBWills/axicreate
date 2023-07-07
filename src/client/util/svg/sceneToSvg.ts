import * as ln from "@lnjs/core"
// eslint-disable-next-line import/no-extraneous-dependencies
import { Path } from "@lnjs/core/lib/path"
import {
  Scene,
  Mesh,
  LineSegments,
  PerspectiveCamera,
  BoxGeometry,
  Float32BufferAttribute,
  Matrix4,
  InterleavedBufferAttribute,
  Box3,
  Vector3,
} from "three"
import { LineGeometry } from "three-stdlib"

import { triggerIpcFunction } from "src/client/ipc/triggerIpcFunction"

import { Size } from "../../types/Size"
import { V3 } from "../../types/V3"
import { toLnVec } from "../vec/toLnVec"

const MAX = new ln.Vector(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)

const MIN = new ln.Vector(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER)

export async function sceneToSvg({
  scene,
  camera,
  canvasSize,
  target,
}: {
  scene: Scene
  camera: PerspectiveCamera
  canvasSize: Size
  target: V3
}): Promise<string> {
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
    if ("geometry" in o3d && "type" in o3d.geometry) {
      if (o3d.geometry.type === "BoxGeometry") {
        console.log(`2.${index + 1}: adding a box to the scene`)
        addBox(o3d, o3d.geometry as BoxGeometry, lnScene)
      } else if (o3d.geometry.type === "BufferGeometry") {
        // pass
      } else if (o3d.geometry.type === "LineGeometry") {
        console.log(`2.${index + 1}: adding a line to the scene`)
        addLine(o3d, o3d.geometry as LineGeometry, lnScene)
      } else {
        console.log(`2.${index + 1}: adding a something else to the scene ${o3d.geometry.type}`)
      }
    }
  })

  console.log("3: rendering to ln", canvasSize)
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

  console.log("4: Creating the SVG")
  const svg = ln.toSVG(ln.simplify(paths, 5), canvasSize.w, canvasSize.h)

  const result = await triggerIpcFunction("save-svg", ["test", "s.svg"], svg)

  if (result.success) {
    await triggerIpcFunction("open-file", result.path)
  }

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

    const rotatedCube = transformShape(
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

function addLine(mesh: Mesh, line: LineGeometry, scene: ln.Scene) {
  console.log({ mesh, line })

  const path = arrayToVectors(
    (line.attributes.instanceStart as InterleavedBufferAttribute).array,
    mesh.matrixWorld
  )

  const box = box3ToBox(line.boundingBox)
  scene.add(new ln.Polyline([path], box))
}

function box3ToBox(box3: Box3): ln.Box {
  const { x: minX, y: minY, z: minZ } = box3.min
  const { x: maxX, y: maxY, z: maxZ } = box3.max
  return new ln.Box(new ln.Vector(minX, minY, minZ), new ln.Vector(maxX, maxY, maxZ))
}

function matrix4ToLnMatrix(matrix4: Matrix4) {
  return new ln.Matrix(...matrix4.elements)
}

function mergeMatrices(...matrices: ln.Matrix[]): ln.Matrix {
  let newMatrix: ln.Matrix = matrices[0]

  matrices.forEach((m) => {
    newMatrix = newMatrix.mul(m)
  })

  return newMatrix
}

function transformShape(shape: ln.ShapeT, ...matrices: ln.Matrix[]): ln.ShapeT {
  if (matrices.length === 0) {
    return shape
  }

  const newMatrix = mergeMatrices(...matrices)
  return new ln.TransformedShape(shape, newMatrix)
}

function transformPath(paths: Path[], ...matrices: ln.Matrix[]): Path[] {
  if (matrices.length === 0) {
    return paths
  }

  const newMatrix = mergeMatrices(...matrices)
  return ln.transform(paths, newMatrix)
}

function arrayToVectors(arr: ArrayLike<number>, transformMatrix: Matrix4): ln.Vector[] {
  if (arr.length % 3 !== 0) {
    throw new Error(
      `Trying to convert an array to vector 3, but the array isn't divisible by three. ${arr.length}`
    )
  }

  const result: ln.Vector[] = []
  for (let i = 0; i < arr.length - 2; i += 3) {
    const v = new Vector3(arr[i], arr[i + 1], arr[i + 2])
    const { x, y, z } = v.applyMatrix4(transformMatrix)
    result.push(new ln.Vector(x, y, z))
  }

  return result
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
