import { Autocomplete, TextField } from "@mui/material";

type Props = {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
};

const AxiSelect = ({ id, label, options, onChange, value }: Props) => (
  <Autocomplete
    id={id}
    disablePortal
    disableClearable
    options={options}
    value={value}
    onChange={(_, newValue) => onChange(newValue)}
    // eslint-disable-next-line react/jsx-props-no-spreading
    renderInput={(params) => <TextField {...params} label={label} />}
  />
);

export default AxiSelect;
