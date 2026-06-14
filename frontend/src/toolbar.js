import { DraggableNode } from './draggableNode';

const nodeOptions = [
  { type: 'customInput', label: 'Input', description: 'Source data' },
  { type: 'llm', label: 'LLM', description: 'AI response' },
  { type: 'customOutput', label: 'Output', description: 'Final result' },
  { type: 'text', label: 'Text', description: 'Template' },
  { type: 'api', label: 'API', description: 'HTTP request' },
  { type: 'database', label: 'Database', description: 'Query rows' },
  { type: 'condition', label: 'Condition', description: 'Branch logic' },
  { type: 'filter', label: 'Filter', description: 'Refine data' },
  { type: 'email', label: 'Email', description: 'Notify' },
];

export const PipelineToolbar = () => {
  return (
    <aside className="pipeline-toolbar">
      <div>
        <h1>Pipeline Builder</h1>
      </div>
      <div className="node-palette">
        {nodeOptions.map((node) => (
          <DraggableNode
            key={node.type}
            type={node.type}
            label={node.label}
            description={node.description}
          />
        ))}
      </div>
    </aside>
  );
};
