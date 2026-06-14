import { useState } from 'react';
import { BaseNode, Field, SelectInput, TextInput, leftHandle } from './BaseNode';
import { useStore } from '../store';

export const OutputNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace('customOutput-', 'output_')
  );
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  const updateName = (value) => {
    setCurrName(value);
    updateNodeField(id, 'outputName', value);
  };

  const updateType = (value) => {
    setOutputType(value);
    updateNodeField(id, 'outputType', value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Output"
      subtitle="Pipeline result"
      icon="OUT"
      accent="#cc0000"
      handles={[leftHandle(`${id}-value`)]}
    >
      <Field label="Name">
        <TextInput value={currName} onChange={updateName} />
      </Field>
      <Field label="Type">
        <SelectInput
          value={outputType}
          onChange={updateType}
          options={[
            { value: 'Text', label: 'Text' },
            { value: 'File', label: 'Image' },
          ]}
        />
      </Field>
    </BaseNode>
  );
};
