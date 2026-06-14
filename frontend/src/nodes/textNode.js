import { useMemo, useState } from 'react';
import { BaseNode, Field, TextArea, leftHandle, rightHandle } from './BaseNode';
import { useStore } from '../store';

const variablePattern = /\{\{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*\}\}/g;

const getVariables = (text) => {
  const variables = new Set();
  let match = variablePattern.exec(text);

  while (match) {
    variables.add(match[1]);
    match = variablePattern.exec(text);
  }

  return Array.from(variables);
};

const getNodeSize = (text, variableCount) => {
  const lines = text.split('\n');
  const longestLine = Math.max(...lines.map((line) => line.length), 18);

  return {
    width: Math.min(520, Math.max(280, longestLine * 7 + 104)),
    minHeight: Math.min(420, Math.max(168, lines.length * 24 + variableCount * 12 + 132)),
  };
};

export const TextNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [currText, setCurrText] = useState(data?.text || '{{ input }}');
  const variables = useMemo(() => getVariables(currText), [currText]);
  const { width, minHeight } = useMemo(
    () => getNodeSize(currText, variables.length),
    [currText, variables.length]
  );

  const handles = [
    ...variables.map((variable, index) =>
      leftHandle(`${id}-var-${variable}`, {
        top: `${Math.round(((index + 1) / (variables.length + 1)) * 100)}%`,
      })
    ),
    rightHandle(`${id}-output`),
  ];

  const updateText = (value) => {
    setCurrText(value);
    updateNodeField(id, 'text', value);
    updateNodeField(id, 'variables', getVariables(value));
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      subtitle={variables.length ? `${variables.length} variable inputs` : 'Template text'}
      icon="TXT"
      accent="#e63946"
      handles={handles}
      width={width}
      minHeight={minHeight}
    >
      <Field label="Template">
        <TextArea
          value={currText}
          onChange={updateText}
          placeholder="Write text with {{ input }} variables"
          rows={Math.max(3, Math.min(10, currText.split('\n').length + 1))}
        />
      </Field>
      {variables.length > 0 && (
        <div className="variable-list">
          {variables.map((variable) => (
            <span key={variable}>{variable}</span>
          ))}
        </div>
      )}
    </BaseNode>
  );
};
