import { BaseNode, Field, SelectInput, TextInput, leftHandle, rightHandle } from './BaseNode';
import { useStore } from '../store';

export const APINode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  return (
    <BaseNode
      id={id}
      data={data}
      title="API"
      subtitle="HTTP request"
      icon="API"
      accent="#b30000"
      handles={[leftHandle(`${id}-params`), rightHandle(`${id}-response`)]}
    >
      <Field label="Method">
        <SelectInput
          value={data?.method || 'GET'}
          onChange={(value) => updateNodeField(id, 'method', value)}
          options={[
            { value: 'GET', label: 'GET' },
            { value: 'POST', label: 'POST' },
            { value: 'PUT', label: 'PUT' },
            { value: 'DELETE', label: 'DELETE' },
          ]}
        />
      </Field>
      <Field label="URL">
        <TextInput
          value={data?.url || 'https://api.example.com'}
          onChange={(value) => updateNodeField(id, 'url', value)}
        />
      </Field>
    </BaseNode>
  );
};
