import { BaseNode, Field, TextInput, leftHandle, rightHandle } from './BaseNode';
import { useStore } from '../store';

export const ConditionNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  return (
    <BaseNode
      id={id}
      data={data}
      title="Condition"
      subtitle="Branch by expression"
      icon="IF"
      accent="#ff5c5c"
      handles={[
        leftHandle(`${id}-value`),
        rightHandle(`${id}-true`, { top: '38%' }),
        rightHandle(`${id}-false`, { top: '72%' }),
      ]}
    >
      <Field label="Expression">
        <TextInput
          value={data?.expression || 'score > 80'}
          onChange={(value) => updateNodeField(id, 'expression', value)}
        />
      </Field>
      <div className="route-labels">
        <span>True</span>
        <span>False</span>
      </div>
    </BaseNode>
  );
};
