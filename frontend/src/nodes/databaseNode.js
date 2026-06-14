import { BaseNode, Field, SelectInput, TextArea, leftHandle, rightHandle } from './BaseNode';
import { useStore } from '../store';

export const DatabaseNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  return (
    <BaseNode
      id={id}
      data={data}
      title="Database"
      subtitle="Query stored data"
      icon="DB"
      accent="#400000"
      handles={[leftHandle(`${id}-input`), rightHandle(`${id}-rows`)]}
    >
      <Field label="Source">
        <SelectInput
          value={data?.source || 'postgres'}
          onChange={(value) => updateNodeField(id, 'source', value)}
          options={[
            { value: 'postgres', label: 'Postgres' },
            { value: 'bigquery', label: 'BigQuery' },
            { value: 'snowflake', label: 'Snowflake' },
          ]}
        />
      </Field>
      <Field label="Query">
        <TextArea
          value={data?.query || 'select * from customers limit 10'}
          onChange={(value) => updateNodeField(id, 'query', value)}
          rows={2}
        />
      </Field>
    </BaseNode>
  );
};
