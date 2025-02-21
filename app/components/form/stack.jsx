import {TextField, Text} from '@shopify/polaris';

function Stack({id, label="", placeholder="", stack, max, valueFunc, onChange, addFunc }) {
  return (
    <>
    <Text variant="bodyMd" as="p">
        {label}
    </Text>
    <div className="space-y-[.5rem] mt-[.25rem]">
        {
            stack ? stack.map((fieldValue, index) => 
                <>
                    <TextField
                        id={id}
                        key={`stack-element-${index}`}
                        placeholder={placeholder}
                        autoComplete="on"
                        size="medium"
                        value={fieldValue}
                        onChange={(value) => onChange(value, index)}
                    />
                    {
                        index === stack.length - 1 && max !== index + 1 ? 
                        <button onClick={addFunc} className="ml-[.25rem] flex space-x-[.25rem]">
                            <Text variant="bodyMd" as="p">Add Starter Question</Text>
                        </button> : null
                    }
                </>
            ) : null
        }
    </div>
    </>
  )
}

export default Stack