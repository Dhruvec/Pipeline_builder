import { BaseNode, Field, SelectInput, TextInput, leftHandle, rightHandle } from './BaseNode';
import { useStore } from '../store';

export const FilterNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  return (
    <BaseNode
      id={id}
      data={data}
      title="Filter"
      subtitle="Keep matching records"
      icon="FLT"
      accent="#ff8f8f"
      handles={[leftHandle(`${id}-rows`), rightHandle(`${id}-filtered`)]}
    >
      <Field label="Field">
        <TextInput
          value={data?.field || 'status'}
          onChange={(value) => updateNodeField(id, 'field', value)}
        />
      </Field>
      <Field label="Operator">
        <SelectInput
          value={data?.operator || 'equals'}
          onChange={(value) => updateNodeField(id, 'operator', value)}
          options={[
            { value: 'equals', label: 'Equals' },
            { value: 'contains', label: 'Contains' },
            { value: 'greaterThan', label: 'Greater than' },
          ]}
        />
      </Field>
      <Field label="Value">
        <TextInput
          value={data?.value || 'active'}
          onChange={(value) => updateNodeField(id, 'value', value)}
        />
      </Field>
    </BaseNode>
  );
};
