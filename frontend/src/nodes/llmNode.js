import { BaseNode, Field, SelectInput, TextArea, leftHandle, rightHandle } from './BaseNode';
import { useStore } from '../store';

export const LLMNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      subtitle="Generate a response"
      icon="AI"
      accent="#5c0000"
      handles={[
        leftHandle(`${id}-system`, { top: '36%' }),
        leftHandle(`${id}-prompt`, { top: '68%' }),
        rightHandle(`${id}-response`),
      ]}
    >
      <Field label="Model">
        <SelectInput
          value={data?.model || 'gpt-4o-mini'}
          onChange={(value) => updateNodeField(id, 'model', value)}
          options={[
            { value: 'gpt-4o-mini', label: 'GPT-4o mini' },
            { value: 'gpt-4.1', label: 'GPT-4.1' },
            { value: 'claude', label: 'Claude' },
          ]}
        />
      </Field>
      <Field label="System">
        <TextArea
          value={data?.systemPrompt || 'You are a helpful assistant.'}
          onChange={(value) => updateNodeField(id, 'systemPrompt', value)}
          rows={2}
        />
      </Field>
    </BaseNode>
  );
};
