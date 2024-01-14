import { ChoiceList } from '@shopify/polaris';

function Choice({ id, title, choices, selected, onChange }) {
  return (
    <ChoiceList
     key="123"
      id={id}
      title={title}
      choices={choices}
      selected={selected}
      onChange={onChange}
    />
  )
}

export default Choice