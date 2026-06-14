import { useState } from 'react';
import { BaseNode, Field, SelectInput, TextInput, rightHandle } from './BaseNode';
import { useStore } from '../store';

export const InputNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace('customInput-', 'input_')
  );
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  const updateName = (value) => {
    setCurrName(value);
    updateNodeField(id, 'inputName', value);
  };

  const updateType = (value) => {
    setInputType(value);
    updateNodeField(id, 'inputType', value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Input"
      subtitle="Pipeline source"
      icon="IN"
      accent="#8b0000"
      handles={[rightHandle(`${id}-value`)]}
    >
      <Field label="Name">
        <TextInput value={currName} onChange={updateName} />
      </Field>
      <Field label="Type">
        <SelectInput
          value={inputType}
          onChange={updateType}
          options={[
            { value: 'Text', label: 'Text' },
            { value: 'File', label: 'File' },
          ]}
        />
      </Field>
    </BaseNode>
  );
};
