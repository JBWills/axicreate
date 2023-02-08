import { Mesh, PerspectiveCamera, Scene } from "three"
import {
  HiddenChainPass,
  SVGMesh,
  SVGRenderInfo,
  SVGRenderer,
  VisibleChainPass,
} from "three-svg-renderer"

import { toSize } from "../../types/Size"
import { Vec2 } from "../../types/Vec2"

export default function sceneToSvg({
  scene,
  camera,
  ignoreVisibility,
  size,
}: {
  scene: Scene
  camera: PerspectiveCamera
  ignoreVisibility: boolean
  size: Vec2
}) {
  const meshes: SVGMesh[] = []
  scene.traverse((obj) => {
    const meshObj = obj as Mesh
    if (meshObj.isMesh) {
      meshes.push(new SVGMesh(meshObj))
    }
  })

  // Setup the svg renderer and add pass to it
  const renderer = new SVGRenderer()

  const visibleChainPass = new VisibleChainPass()
  const hiddenChainPass = new HiddenChainPass()
  hiddenChainPass.enabled = !ignoreVisibility

  renderer.addPass(visibleChainPass)
  renderer.addPass(hiddenChainPass)

  const info = new SVGRenderInfo()

  renderer.viewmap.options.ignoreVisibility = ignoreVisibility

  renderer.generateSVG(meshes, camera, toSize(size), info).then((newSvg) => {
    console.log(newSvg.svg())
  })
}
