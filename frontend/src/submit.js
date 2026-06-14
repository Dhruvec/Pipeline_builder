import { useState } from 'react';
import { shallow } from 'zustand/shallow';
import { useStore } from './store';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  clearNodes: state.clearNodes
});

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const serializePipeline = (nodes, edges) => ({
  nodes: nodes.map((node) => ({
    id: node.id,
    type: node.type,
    position: node.position,
    data: node.data,
  })),
  edges: edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    sourceHandle: edge.sourceHandle,
    targetHandle: edge.targetHandle,
  })),
});

export const SubmitButton = () => {
  const { nodes, edges, clearNodes } = useStore(selector, shallow);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/pipelines/parse`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serializePipeline(nodes, edges)),
      });

      if (!response.ok) {
        throw new Error('Pipeline parsing failed.');
      }

      const result = await response.json();
      alert(
        `Pipeline summary\n\nNodes: ${result.num_nodes}\nEdges: ${result.num_edges}\nDAG: ${
          result.is_dag ? 'Yes' : 'No'
        }`
      );
    } catch (error) {
      alert(`Unable to submit pipeline: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    console.log('Handle clear called');
    if (nodes.length === 0 && edges.length === 0) {
      console.log('No nodes or edges to clear');
      return;
    }
    if (window.confirm('Clear all nodes and edges?')) {
      console.log('User confirmed clear');
      clearNodes();
    }
  };

  return (
    <div className="submit-bar">
       <button
         className="clear-button"
         type="button"
         onClick={handleClear}
         disabled={nodes.length === 0 && edges.length === 0}
       >
         Clear
       </button>
      <button
        className="submit-button"
        type="button"
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Analyzing...' : 'Submit '}
      </button>
    </div>
  );
};
