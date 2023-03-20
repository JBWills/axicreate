import AxiColorPicker from "./inputs/AxiColorPicker"
import AxiDropdown from "./inputs/AxiDropdown"
import AxiInputSwitch from "./inputs/AxiInputSwitch"
import AxiInputText from "./inputs/AxiInputText"
import AxiSelectButton from "./inputs/AxiSelectButton"
import AxiSlider from "./inputs/AxiSlider"
import AxiSlider2D from "./inputs/AxiSlider2D"
import { useStyles } from "../../hooks/useStyles"
import { V2 } from "../../types/V2"
import IconButton from "../components/IconButton"

export default function ControlPanel() {
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

  return (
    <div style={styles.controlPanelContainer}>
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
