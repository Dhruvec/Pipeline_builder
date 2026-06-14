import { BaseNode, Field, TextInput, leftHandle, rightHandle } from './BaseNode';
import { useStore } from '../store';

export const EmailNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  return (
    <BaseNode
      id={id}
      data={data}
      title="Email"
      subtitle="Send a message"
      icon="EML"
      accent="#9e0a0a"
      handles={[leftHandle(`${id}-body`), rightHandle(`${id}-sent`)]}
    >
      <Field label="To">
        <TextInput
          value={data?.to || 'team@example.com'}
          onChange={(value) => updateNodeField(id, 'to', value)}
        />
      </Field>
      <Field label="Subject">
        <TextInput
          value={data?.subject || 'Pipeline update'}
          onChange={(value) => updateNodeField(id, 'subject', value)}
        />
      </Field>
    </BaseNode>
  );
};
