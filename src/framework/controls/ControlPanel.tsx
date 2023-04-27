import { useCallback, useMemo } from "react"

import { useRecoilState } from "recoil"

import AxiColorPicker from "./inputs/AxiColorPicker"
import AxiDropdown from "./inputs/AxiDropdown"
import AxiInputSwitch from "./inputs/AxiInputSwitch"
import AxiInputText from "./inputs/AxiInputText"
import AxiSelectButton from "./inputs/AxiSelectButton"
import AxiSlider from "./inputs/AxiSlider"
import AxiSlider2D from "./inputs/AxiSlider2D"
import { CameraState } from "../../context/recoil/CameraState"
import { DrawState } from "../../context/recoil/DrawState"
import { PaperState } from "../../context/recoil/PaperState"
import { ZoomLevelState } from "../../context/recoil/VirtualCanvasState"
import { useStyles } from "../../hooks/useStyles"
import { PaperName, paperNames } from "../../print/Paper"
import { SelectOption } from "../../types/SelectOption"
import { V2 } from "../../types/V2"
import IconButton from "../components/IconButton"

interface ControlPanelProps {}

export default function ControlPanel({}: ControlPanelProps) {
  const [{ name: paperName }, setPaperState] = useRecoilState(PaperState)
  const [zoomLevel, setZoomLevelState] = useRecoilState(ZoomLevelState)
  const [cameraState, setCameraState] = useRecoilState(CameraState)

  const [
    {
      randomSeed,
      numBoxes,
      boxSpacing,
      randomizeBoxRotation,
      randomizeBoxSize,
    },
    setDrawState,
  ] = useRecoilState(DrawState)
  const styles = useStyles(
    () => ({
      controlPanelContainer: {
        width: "100%",
        padding: 10,
        paddingBottom: 50,
        minWidth: 200,
      },
    }),
    []
  )

  const paperOptions: SelectOption<PaperName>[] = useMemo(
    () => paperNames.map((name) => ({ value: name, displayName: name })),
    []
  )

  const handleChangePaper = useCallback(
    (newPaper: PaperName) =>
      setPaperState((oldState) => ({ ...oldState, name: newPaper })),
    [setPaperState]
  )

  const handleChangeFov = useCallback(
    (fov: number) => {
      setCameraState((oldState) => ({ ...oldState, focalLength: fov }))
    },
    [setCameraState]
  )

  const handleChangeZoom = useCallback(
    (value: number) => setZoomLevelState(value),
    [setZoomLevelState]
  )

  const handleChangeNumBoxes = useCallback(
    (value: number) =>
      setDrawState((oldState) => ({ ...oldState, numBoxes: value })),
    [setDrawState]
  )

  const handleChangeBoxSpacing = useCallback(
    (value: number) =>
      setDrawState((oldState) => ({ ...oldState, boxSpacing: value })),
    [setDrawState]
  )

  const handleChangeRandomSeed = useCallback(
    (value: number) =>
      setDrawState((oldState) => ({ ...oldState, randomSeed: value })),
    [setDrawState]
  )

  const handleChangeRandomizeSize = useCallback(
    (value: number) =>
      setDrawState((oldState) => ({ ...oldState, randomizeBoxSize: value })),
    [setDrawState]
  )

  const handleChangeRandomizeRotation = useCallback(
    (value: number) =>
      setDrawState((oldState) => ({
        ...oldState,
        randomizeBoxRotation: value,
      })),
    [setDrawState]
  )

  return (
    <div style={styles.controlPanelContainer}>
      <AxiDropdown
        label="Paper"
        value={paperName}
        options={paperOptions}
        onChange={handleChangePaper}
      />
      <AxiSlider
        label="Zoom level"
        type="single"
        min={0.1}
        max={2.0}
        value={zoomLevel}
        onChange={handleChangeZoom}
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

      <AxiSlider
        label="Num boxes"
        type="single"
        min={1}
        max={50}
        step={1}
        value={numBoxes}
        onChange={handleChangeNumBoxes}
      />

      <AxiSlider
        label="Box spacing"
        type="single"
        min={0}
        max={2}
        step={0.1}
        value={boxSpacing}
        onChange={handleChangeBoxSpacing}
      />

      <AxiSlider
        label="Random seed"
        type="single"
        min={0}
        max={100}
        step={1}
        value={randomSeed}
        onChange={handleChangeRandomSeed}
      />

      <AxiSlider
        label="Randomize size"
        type="single"
        min={0}
        max={1}
        value={randomizeBoxSize}
        onChange={handleChangeRandomizeSize}
      />

      <AxiSlider
        label="Randomize rotation"
        type="single"
        min={0}
        max={1}
        value={randomizeBoxRotation}
        onChange={handleChangeRandomizeRotation}
      />
      <AxiInputText label="Test label" />
      <AxiSlider label="Slider" type="single" min={0} max={10} step={2.5} />
      <AxiSlider label="DoubleSlider" type="range" min={0} max={10} />
      <AxiColorPicker label="Color Picker" />
      <AxiSelectButton
        label="SelectButton"
        options={["One", "Two", "Three", "Four", "Five", "Six"]}
      />
      <AxiInputSwitch label="Input Switch" />
      <AxiDropdown
        label="Dropdown"
        options={[
          { value: "option1Value", displayName: "Option 1" },
          { value: "option2Value", displayName: "Option 2" },
          { value: "option3Value", displayName: "Option 3" },
        ]}
      />
      <IconButton
        onClick={() => console.log("Click!")}
        icon="PLUS_CIRCLE"
        tooltip="Icon button"
      />
      <AxiSlider2D label="2d slider" />
      <AxiSlider2D label="2d slider 2" min={new V2(1, 2)} max={new V2(3, 4)} />
      <AxiSlider2D
        label="2d slider 3"
        min={new V2(-1, -1)}
        max={new V2(2, 2)}
      />
      <AxiSlider2D
        label="2d slider 4"
        min={new V2(-10, -1)}
        max={new V2(10, 1)}
      />
      <AxiSlider2D
        label="2d slider 5"
        min={new V2(-10, -1)}
        max={new V2(10, 1)}
      />
      <AxiSlider2D
        label="2d slider 6"
        min={new V2(-10, -1)}
        max={new V2(10, 1)}
      />
    </div>
  )
}
