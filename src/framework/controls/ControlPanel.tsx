import "./ControlPanel.css"
import AxiColorPicker from "./inputs/AxiColorPicker"
import AxiDropdown from "./inputs/AxiDropdown"
import AxiInputSwitch from "./inputs/AxiInputSwitch"
import AxiInputText from "./inputs/AxiInputText"
import AxiSelectButton from "./inputs/AxiSelectButton"
import AxiSlider from "./inputs/AxiSlider"
import AxiSlider2D from "./inputs/AxiSlider2D"
import IconButton from "../components/IconButton"

export default function ControlPanel() {
  return (
    <div className="ControlPanel">
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
      <AxiSlider2D label="2d slider 2" min={[1, 2]} max={[3, 4]} />
      <AxiSlider2D label="2d slider 3" min={[-1, -1]} max={[2, 2]} />
      <AxiSlider2D label="2d slider 4" min={[-10, -1]} max={[10, 1]} />
      <AxiSlider2D label="2d slider 5" min={[-10, -1]} max={[10, 1]} />
      <AxiSlider2D label="2d slider 6" min={[-10, -1]} max={[10, 1]} />
    </div>
  )
}
