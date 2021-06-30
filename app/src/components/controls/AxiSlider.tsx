import { Slider } from "@material-ui/core";
import styled from "styled-components";

import MinMax from "types/MinMax";
import Padding from "util/css/mixins/Padding";
import useCall from "util/hooks/useCall";
import { rangeLength } from "util/numberUtil";

const ContainerStyle = styled.div`
  ${Padding({ horizontal: "half", bottom: "base", top: "double" })}
  display: flex;
  align-items: center;
`;

const LabelWrapper = styled.div`
  ${Padding({ right: "half", vertical: "base" })}
  width: 100px;
  flex-grow: 0;
`;

type AxiSliderProps = {
  label: string;
  minMax: MinMax;
  value: number;
  step?: number;
  onChange: (n: number) => void;
};

const defaultProps = {
  step: undefined,
};

const AxiSlider = ({
  label,
  minMax,
  value,
  step,
  onChange,
}: AxiSliderProps) => {
  const numberValueFunction = useCall(
    (newValue) => {
      const totalSize = rangeLength(minMax);

      let numDigits: number;

      if (totalSize < 2) numDigits = 2;
      else if (totalSize < 100) numDigits = 1;
      else numDigits = 0;

      return Number(newValue).toFixed(numDigits);
    },
    [minMax]
  );

  const labelId = `label_${label}`;

  return (
    <ContainerStyle>
      <LabelWrapper id={labelId}>{label}</LabelWrapper>
      <Slider
        aria-labelledby={labelId}
        name={label}
        min={minMax[0]}
        max={minMax[1]}
        value={value}
        onChange={(_, v) => onChange(v as number)}
        orientation="horizontal"
        step={step ?? 0.1}
        valueLabelDisplay="on"
        valueLabelFormat={numberValueFunction}
      />
    </ContainerStyle>
  );
};

AxiSlider.defaultProps = defaultProps;

export default AxiSlider;
