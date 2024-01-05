import {TextField, ChoiceList} from '@shopify/polaris';
import {useState, useCallback} from 'react';

export function ChoiceDynamic() {
  const [selected, setSelected] = useState(['none']);
  const [textFieldValue, setTextFieldValue] = useState('');

  const handleChoiceListChange = useCallback(
    (value) => setSelected(value),
    [],
  );

  const handleTextFieldChange = useCallback(
    (value) => setTextFieldValue(value),
    [],
  );

  const renderChildren = useCallback(
    (isSelected) =>
      isSelected && (
        <TextField
          label="Minimum Quantity"
          labelHidden
          onChange={handleTextFieldChange}
          value={textFieldValue}
          autoComplete="off"
        />
      ),
    [handleTextFieldChange, textFieldValue],
  );

  return (
    <div style={{height: '300 px'}}>
      <ChoiceList
        title="Discount minimum requirements"
        choices={[
          {label: '10-15 min', value: '10-15 min'},
          {label: '15-30 min', value: '15-30 min'},
          {label: '30-45 min', value: '30-45 min'},
          {label: 'More than an hour', value: '45-60 min'},
          {label: 'Other', value: 'Other'},
          {
            label: 'Minimum quantity',
            value: 'minimum_quantity',
            renderChildren,
          },
        ]}
        selected={selected}
        onChange={handleChoiceListChange}
      />
    </div>
  );
}

  