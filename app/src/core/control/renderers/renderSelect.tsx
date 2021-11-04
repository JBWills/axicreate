import AxiSelect from "../../../components/controls/AxiSelect";
import { selectWithDefaults } from "../defaults/defaults";
import { SelectConfig } from "../types/ControlDefinitions";

export default (
  config: SelectConfig,
  value: string | null,
  onChange: (newValue: string) => void
) => {
  const { id, label, initialValue, options } = selectWithDefaults(config);

  return (
    <AxiSelect
      id={id}
      label={label}
      options={options}
      onChange={onChange}
      value={value || initialValue}
    />
  );
};
