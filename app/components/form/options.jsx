import { Select } from "@shopify/polaris";


function Options({ id, label, options, value, onChange }) {
  return (
    <Select
      id={id}
      label={label}
      options={options}
      value={value}
      onChange={onChange}
    />
  )
}

export default Options;
