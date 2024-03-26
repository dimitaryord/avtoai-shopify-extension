import { TextField } from '@shopify/polaris';

function Input({ id, label="", placeholder="", multiline=1, value, onChange }) {
  return (
    <TextField
        id={id}
        label={label}
        multiline={multiline}
        placeholder={placeholder}
        autoComplete="on"
        size="medium"
        value={value}
        onChange={onChange}
    />
  )
}

export default Input