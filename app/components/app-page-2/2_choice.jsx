import {ChoiceList} from '@shopify/polaris';
import {useState, useCallback} from 'react';


export function SingleChoiceListExample() {
  const [selected, setSelected] = useState([]);

  const handleChange = useCallback((value) => setSelected(value), []);

  return (
    <ChoiceList
      title="Company name"
      choices={[
        {label: 'Cosmetics', value: 'osmetics'},
        {label: 'Electronics', value: 'electronics'},
        {label: 'Apparel', value: 'apparel'},
      ]}
      selected={selected}
      onChange={handleChange}
    />
  );
}