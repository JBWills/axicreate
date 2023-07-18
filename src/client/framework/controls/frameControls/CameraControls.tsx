import React from "react"

import { Button } from "primereact/button"
import { useRecoilState, useRecoilValue } from "recoil"

import { CameraState } from "src/client/context/recoil/CameraState"
import { ZoomLevelState } from "src/client/context/recoil/VirtualCanvasState"
import { axiMemo } from "src/client/hooks/genericMemo"
import { useAtomUpdater } from "src/client/hooks/useAtomUpdater"
import { AxiRandom } from "src/client/util/random/AxiRandom"

import { DrawState } from "../../../context/recoil/DrawState"
import AxiSlider from "../inputs/AxiSlider"

interface CameraControlsProps {}

let times = 0
function CameraControls({}: CameraControlsProps) {
  const [zoomLevel, setZoomLevelState] = useRecoilState(ZoomLevelState)
  const [cameraState, setCameraState] = useRecoilState(CameraState)
  const { randomSeed } = useRecoilValue(DrawState)
  const handleChangeFov = useAtomUpdater(setCameraState, "focalLength")

  const random = new AxiRandom(randomSeed + times)
  times += 1
  return (
    <>
      <AxiSlider
        label="Zoom level"
        type="single"
        min={0.1}
        max={2.0}
        value={zoomLevel}
        onChange={setZoomLevelState}
      />
      {cameraState.type === "perspective" && (
        <AxiSlider
          label="FOV"
          type="single"
          min={1}
          max={360}
          value={cameraState.focalLength}
          onChange={handleChangeFov}
        />
      )}
      <Button
        title="Randomize camera position"
        onClick={() => {
          const newPos = random.nextV3([0, 3])
          console.log("Randomizing position: ", newPos)
          return setCameraState((oldState) => ({ ...oldState, position: newPos }))
        }}
      />
    </>
  )
}

export default axiMemo(CameraControls)
